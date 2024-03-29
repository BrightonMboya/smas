import { protectedProcedure, createTRPCRouter } from "../trpc";
import { supplierSchema } from "~/pages/suppliers/new";
import z from "zod";
import {
  FAILED_TO_CREATE,
  FAILED_TO_DELETE,
  organizationEmailSchema,
} from "~/utils/constants";
import { TRPCError } from "@trpc/server";
import useOrganizationId from "~/utils/hooks/useOrganizationId";

export const supplier = createTRPCRouter({
  add: protectedProcedure
    .input(supplierSchema.merge(organizationEmailSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        return await ctx.db.suppliers.create({
          data: {
            organizationsId: organizationId?.id!,
            fullName: input.fullName,
            phoneNumber: input.phoneNumber,
            product: input.product,
            company: input.company,
            notes: input.notes!,
          },
        });
      } catch (cause) {
        console.log(cause);
      }
    }),

  all: protectedProcedure
    .input(
      z.object({
        organizationEmail: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        return await ctx.db.suppliers.findMany({
          where: {
            organizationsId: organizationId?.id,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create a new record",
          cause: cause,
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.suppliers.delete({
          where: {
            id: input.productId,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw FAILED_TO_DELETE;
      }
    }),
});
