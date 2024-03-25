import { TRPCError } from "@trpc/server";
import { publicProcedure, createTRPCRouter } from "../trpc";
import z from "zod";
import { debtsSchema } from "~/pages/debts/new";

export const debts = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.debts.findMany({
        orderBy: {
          date: "desc",
        },
      });
    } catch (cause) {
      console.log(cause);
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not fetch Debts",
      });
    }
  }),

  deleteDebt: publicProcedure
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

  add: publicProcedure.input(debtsSchema).mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.debts.create({
        data: input,
      });
    } catch (cause) {
      console.log(cause);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to add new Debt",
      });
    }
  }),

  markAsPaid: publicProcedure
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

  totalDebts: publicProcedure.query(async ({ ctx, input }) => {
    try {
      return await ctx.db.debts.aggregate({
        _sum: {
          amount: true,
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
