import { createTRPCRouter, protectedProcedure } from "../trpc";

export const auth = createTRPCRouter({
  getProfileData: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  
});
