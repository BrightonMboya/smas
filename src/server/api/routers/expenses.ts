import { expensesSchema } from "~/components/accounting/Expenses";
import { protectedProcedure, createTRPCRouter } from "../trpc";
import z from "zod";

import {
  FAILED_TO_CREATE,
  NOT_FOUND,
  organizationEmailSchema,
} from "~/utils/constants";
import useOrganizationId from "~/utils/hooks/useOrganizationId";

export const accounting = createTRPCRouter({
  addExpense: protectedProcedure
    .input(expensesSchema.merge(organizationEmailSchema))
    .mutation(async ({ input, ctx }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        return await ctx.db.expenses.create({
          data: {
            organizationsId: organizationId?.id!,
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
    .input(organizationEmailSchema)
    .query(async ({ input, ctx }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        return await ctx.db.sales.findMany({
          where: {
            organizationsId: organizationId?.id,
          },
          take: 5,
          // orderBy: {
          //   date: "desc",
          // },
        });
      } catch (cause) {
        console.log(cause);
      }
    }),

  allExpenses: protectedProcedure
    .input(organizationEmailSchema)
    .query(async ({ input, ctx }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        return await ctx.db.expenses.findMany({
          orderBy: {
            date: "desc",
          },
          where: {
            organizationsId: organizationId?.id,
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
