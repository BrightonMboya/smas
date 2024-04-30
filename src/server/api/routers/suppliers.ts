import { createTRPCRouter, protectedProcedure } from "../trpc";
import { supplierSchema } from "~/app/dashboard/suppliers/_components/schema";
import z from "zod";
import { FAILED_TO_CREATE, FAILED_TO_DELETE } from "~/utils/constants";
import { TRPCError } from "@trpc/server";

export const supplier = createTRPCRouter({
  add: protectedProcedure
    .input(supplierSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.suppliers.create({
          data: {
            // @ts-ignore
            organization_Id: ctx.user?.id,
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
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.suppliers.findMany({
          where: {
            // @ts-ignore
            organization_id: ctx.user?.id,
          },
        });

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
