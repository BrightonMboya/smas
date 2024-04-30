import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";

import { FAILED_TO_CREATE, NOT_FOUND } from "~/utils/constants";
import { expensesSchema } from "~/app/dashboard/expenses/_components/_schema/expensesSchema";

export const accounting = createTRPCRouter({
  addExpense: protectedProcedure
    .input(expensesSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.db.expenses.create({
          data: {
            // @ts-ignore
            organization_id: ctx.user?.id,
            name: input.name,
            description: input.description,
            date: input.date,
            amount: input.amount,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw FAILED_TO_CREATE;
      }
    }),

  recentSales: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.db.sales.findMany({
          where: {
            organization_id: ctx.user?.id,
          },
          take: 5,
        });
      } catch (cause) {
        console.log(cause);
      }
    }),

  allExpenses: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.db.expenses.findMany({
          where: {
            // @ts-ignore
            organization_id: ctx.user?.id,
          },
          orderBy: {
            date: "desc",
          },
        });
      } catch (cause) {
        console.log(cause);
        throw NOT_FOUND;
      }
    }),

  deleteSale: protectedProcedure
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

  deleteExpense: protectedProcedure
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
});
