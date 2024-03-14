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
        const newSales = await ctx.db.sales.create({
          data: input,
        });
        return newSales;
      } catch (cause) {
        console.log(cause);
      }
    }),
});