import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const debts = createTRPCRouter({
  getProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.db.debts.findFirstOrThrow({
      // where: {
      //   id: ctx.user.id,
      // },
    });
  }),

  getAllDebts: protectedProcedure.query(({ ctx }) => {
    return ctx.db.debts.findMany({
      where: {
        // @ts-ignore
        organizations_id: ctx.user.id,
      },
    });
  }),
});
