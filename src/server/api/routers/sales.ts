import z from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";
import { salesSchema } from "~/components/accounting/Sales";
import { Prisma } from "@prisma/client";

export const sales = createTRPCRouter({
  fetchSalesById: publicProcedure
    .input(
      z.object({
        salesId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.db.sales.findUnique({
          where: {
            id: input.salesId,
          },
        });
      } catch (cause) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This sale is invalid",
        });
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

  editSales: publicProcedure
    .input(salesSchema.merge(z.object({ saleId: z.string() })))
    .mutation(async ({ ctx, input }) => {
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
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product Not Found",
          });
        }

        if (product.stockAvailable < input.quantity) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Insufficient Stock",
          });
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

        const editedSale = await ctx.db.sales.update({
          where: {
            id: input.saleId,
          },
          data: {
            customerName: input.customerName,
            quantity: input.quantity,
            status: input.status,
            date: input.date,
            productsId: input.productsId,
            amount: totalAmount,
          },
        });
        return editedSale;
      } catch (cause) {
        // @ts-ignore
        console.log(cause?.message);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to edit this sale",
        });
      }
    }),

  yearlySales: publicProcedure.query(async ({ ctx }) => {
    type SalesData = {
      name: string;
      total: string;
    };
    try {
      const totalSales = await ctx.db.sales.findMany();
      const monthlySales: { [key: string]: number } = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      };
      totalSales.forEach((sale) => {
        const month = sale.date.toLocaleDateString("en-US", { month: "short" });
        monthlySales[month] += (sale.amount * sale.quantity) / 10000;
      });
      const result: { name: string; total: number }[] = [];
      const months = Object.keys(monthlySales);
      months.forEach((month) => {
        result.push({
          name: month,
          total: monthlySales[month]!,
        });
      });
      return result;
    } catch (cause) {
      console.log(cause);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to load all sales",
      });
    }
  }),
});
