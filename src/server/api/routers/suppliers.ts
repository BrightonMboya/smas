import { protectedProcedure, createTRPCRouter } from "../trpc";
import { supplierSchema } from "~/app/dashboard/suppliers/new/page";
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
        const organizationId = await useOrganizationId(input.organizationEmail);
        if (organizationId !== null) {
          return await ctx.db.suppliers.findMany({
            where: {
              organizationsId: organizationId?.id,
            },
          });
        }

        return null;
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

  fetchSupplierById: protectedProcedure
    .input(z.object({ supplierId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.suppliers.findUnique({
        where: {
          id: input.supplierId,
        },
      });
    }),

  editSupplier: protectedProcedure
    .input(supplierSchema.merge(z.object({ supplierId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      try {
        const supplier = await ctx.db.suppliers.findUnique({
          where: {
            id: input.supplierId,
          },
        });

        if (!supplier) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product Not Found",
          });
        }

        await ctx.db.suppliers.update({
          where: {
            id: input.supplierId,
          },
          data: {
            fullName: input.fullName,
            company: input.company,
            product: input.product,
            phoneNumber: input.phoneNumber,
            notes: input.notes,
          },
        });
      } catch (cause) {
        console.log(cause);
      }
    }),
});
