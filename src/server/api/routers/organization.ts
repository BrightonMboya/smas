import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const organizationRouter = createTRPCRouter({
  editOrganization: protectedProcedure
    .input(z.object({
      organization_name: z.string(),
    //   email: z.string().email(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // update the new info to the auth.user_metadata object
        await ctx.supabase.auth.updateUser({
          data: {
            organization_name: input.organization_name,
          },
        });
        return await ctx.db.organizations.update({
          where: {
            id: ctx.user.id,
          },
          data: {
            name: input.organization_name,
            // emailAddress: input.email,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to edit organization",
        });
      }
      // return await ctx.prisma.organization.update({
      //     where: {
      //         id: ctx.user.organization_id,
      //     },
      //     data: input,
      // });
    }),
});
