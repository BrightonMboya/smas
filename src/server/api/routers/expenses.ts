import { expensesSchema } from "~/components/accounting/Expenses";
import { publicProcedure, createTRPCRouter } from "../trpc";
import z from "zod";
import { salesSchema } from "~/components/accounting/Sales";

export const accounting = createTRPCRouter({
  addExpense: publicProcedure
    .input(expensesSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const newExpense = await ctx.db.expenses.create({
          data: input,
        });
      } catch (cause) {
        console.log(cause);
      }
    }),

  addSales: publicProcedure
    .input(salesSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Calculate total amount
        const totalAmount = input.amount * input.quantity;

        // Update product quantity
        const product = await ctx.db.products.findUnique({
          where: {
            id: input.productsId,
          },
        });
        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stockAvailable < input.quantity) {
          throw new Error("Insufficient stock");
        }

        await ctx.db.products.update({
          where: {
            id: input.productsId,
          },
          data: {
            stockAvailable: {
              decrement: input.quantity,
            },
          },
        });

        const newSales = await ctx.db.sales.create({
          data: {
            ...input,
            amount: totalAmount,
          },
        });

        return newSales;
      } catch (cause) {
        console.log(cause);
      }
    }),

  recentSales: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.sales.findMany({
        take: 5,
        // orderBy: {
        //   date: "desc",
        // },
      });
    } catch (cause) {
      console.log(cause);
    }
  }),

  allSales: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.sales.findMany({
      include: {
        Products: {
          select: {
            name: true,
          },
        },
      },
    });
  }),

  allExpenses: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.expenses.findMany();
  }),

  deleteSale: publicProcedure
    .input(z.object({ saleId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.db.sales.delete({
          where: {
            id: input.saleId,
          },
        });
      } catch (cause) {
        console.log(cause);
      }
    }),

  deleteExpense: publicProcedure
    .input(z.object({ expenseId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.db.expenses.delete({
          where: {
            id: input.expenseId,
          },
        });
      } catch (cause) {
        console.log(cause);
      }
    }),

  totalSales: publicProcedure.query(async ({ ctx }) => {
    const totalSales = await ctx.db.sales.aggregate({
      _sum: {
        amount: true,
      },
    });
    return totalSales;
  }),

  totalExpenses: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.expenses.aggregate({
      _sum: {
        amount: true,
      },
    });
  }),
});
