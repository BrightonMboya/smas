import { createTRPCRouter, protectedProcedure } from "../trpc";

export const auth = createTRPCRouter({
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.user.id;
    }),
});
