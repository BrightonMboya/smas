import { expensesSchema } from "~/components/accounting/Expenses";
import { publicProcedure, createTRPCRouter } from "../trpc";
import z from "zod";

import { TRPCError } from "@trpc/server";

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

  allExpenses: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.expenses.findMany({
      orderBy: {
        date: "desc",
      },
    });
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
