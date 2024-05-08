import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { supabase } from "~/utils/supabase/admin";

export const organizationRouter = createTRPCRouter({
  editOrganization: protectedProcedure
    .input(z.object({
      organization_name: z.string(),
      avatar_url: z.string(),
      //   email: z.string().email(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // update the new info to the auth.user_metadata object
        await ctx.supabase.auth.updateUser({
          data: {
            organization_name: input.organization_name,
            avatar_url: input.avatar_url,
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
    }),

  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.supabase.auth.admin.listUsers();
  }),

  deleteOrganization: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await ctx.db.expenses.deleteMany({
        where: {
          id: ctx.user.id,
        },
      });
      await ctx.db.products.deleteMany({
        where: {
          id: ctx.user.id,
        },
      });
      await ctx.db.sales.deleteMany({
        where: {
          id: ctx.user.id,
        },
      });
      await ctx.db.invoices.deleteMany({
        where: {
          id: ctx.user.id,
        },
      });
      await ctx.db.suppliers.deleteMany({
        where: {
          id: ctx.user.id,
        },
      });
      await ctx.db.debts.deleteMany({
        where: {
          id: ctx.user.id,
        },
      });
      await ctx.db.organizations.delete({
        where: {
          id: ctx.user.id,
        },
      });
      return supabase.auth.admin.deleteUser(ctx.user.id);
    } catch (cause) {
      console.log(cause);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to delete organization",
      });
    }
  }),
});
