import { TRPCError } from "@trpc/server";
import { protectedProcedure, createTRPCRouter } from "../trpc";
import z from "zod";
import { debtsSchema } from "~/app/debts/new/page";
import { organizationEmailSchema } from "~/utils/constants";
import useOrganizationId from "~/utils/hooks/useOrganizationId";

export const debts = createTRPCRouter({
  all: protectedProcedure
    .input(organizationEmailSchema)
    .query(async ({ input, ctx }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        if (organizationId !== null) {
          return await ctx.db.debts.findMany({
            orderBy: {
              date: "desc",
            },
            where: {
              organizationsId: organizationId?.id,
            },
          });
        }
        return null;
      } catch (cause) {
        console.log(cause);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not fetch Debts",
        });
      }
    }),

  deleteDebt: protectedProcedure
    .input(
      z.object({
        debtId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.debts.delete({
          where: {
            id: input.debtId,
          },
        });
      } catch (cause) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to delete this debt",
        });
      }
    }),

  add: protectedProcedure
    .input(debtsSchema.merge(organizationEmailSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        return await ctx.db.debts.create({
          data: {
            debtorName: input.debtorName,
            amount: input.amount,
            date: input.date,
            organizationsId: organizationId?.id!,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to add new Debt",
        });
      }
    }),

  markAsPaid: protectedProcedure
    .input(
      z.object({
        debtId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.debts.update({
          where: {
            id: input.debtId,
          },
          data: {
            paid: true,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to mark it as paid",
        });
      }
    }),

  totalDebts: protectedProcedure
    .input(organizationEmailSchema)
    .query(async ({ ctx, input }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        return await ctx.db.debts.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            organizationsId: organizationId?.id,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to fetch",
        });
      }
    }),
});
