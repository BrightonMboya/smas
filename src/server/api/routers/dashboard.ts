import { NOT_FOUND, organizationEmailSchema } from "~/utils/constants";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import useOrganizationId from "~/utils/hooks/useOrganizationId";

export const dashboard = createTRPCRouter({
  overview: protectedProcedure
    .input(organizationEmailSchema)
    .query(async ({ input, ctx }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        const totalSales = await ctx.db.sales.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            organizationsId: organizationId?.id,
          },
        });

        const totalExpenses = await ctx.db.expenses.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            organizationsId: organizationId?.id,
          },
        });

        const totalDebts = await ctx.db.debts.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            organizationsId: organizationId?.id,
          },
        });

        return { totalDebts, totalSales, totalExpenses };
      } catch (cause) {
        console.log(cause);
        throw NOT_FOUND;
      }
    }),
});
