import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { debtsSchema } from "~/app/dashboard/debts/_components/newDebtSchema";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const debts = createTRPCRouter({
  getAllDebts: protectedProcedure.query(({ ctx }) => {
    return ctx.db.debts.findMany({
      where: {
        organizations_id: ctx.user.id,
      },
    });
  }),

  createNewDebt: protectedProcedure
    .input(debtsSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const newDebt = await ctx.db.debts.create({
          data: {
            debtorName: input.debtorName,
            date: input.date,
            amount: input.amount,
            organizations_id: ctx.user.id,
          },
        });

        return newDebt;
      } catch (cause) {
        // console.log(cause);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create new debt",
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
});
