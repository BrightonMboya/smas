import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { bankSchema } from "~/components/invoices/bankForms/CreateBank";
import { CANT_MUTATE_ERROR } from "../trips/newTrip";

export const bank = createTRPCRouter({
  createBank: protectedProcedure
    .input(
      bankSchema.merge(
        z.object({
          organizationEmail: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
        });
        const newBank = await ctx.db.bankDetails.create({
          data: {
            ...input,
            organizationId: Number(organizationId?.id),
          },
        });
        return newBank;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),

  fetchOrganizationBanks: protectedProcedure
    .input(
      z.object({
        organizationEmail: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const organizationId = await ctx.db.organizations.findUnique({
        where: {
          emailAddress: input.organizationEmail,
        },
        select: {
          id: true,
        },
      });

      const organizationBanks = await ctx.db.bankDetails.findMany({
        where: {
          organizationId: organizationId?.id,
        },
        select: {
          id: true,
          bankName: true,
        },
      });

      return organizationBanks;
    }),
});
