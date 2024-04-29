import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import z from "zod";
import { productSchema } from "~/app/dashboard/products/new/page";
import {
  FAILED_TO_CREATE,
  NOT_FOUND,
  organizationEmailSchema,
} from "~/utils/constants";
import useOrganizationId from "~/utils/hooks/useOrganizationId";

export const products = createTRPCRouter({
  add: protectedProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const organizationId = "";
        const newProduct = await ctx.db.products.create({
          data: {
            name: input.name,
            buyingPrice: input.buyingPrice,
            sellingPrice: input.sellingPrice,
            stockAvailable: input.stockAvailable,
            description: input.description,
            organizationsId: organizationId,
          },
        });
        return newProduct;
      } catch (cause) {
        console.log(cause);
        throw FAILED_TO_CREATE;
      }
    }),

  all: protectedProcedure
    .input(organizationEmailSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.products.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (cause) {
        console.log(cause);
        throw NOT_FOUND;
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.products.delete({
          where: {
            id: input.productId,
          },
        });
      } catch (cause) {
        console.log(cause);
      }
    }),

  fetchById: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.products.findUnique({
          where: {
            id: input.productId,
          },
        });
      } catch (cause) {
        console.log(cause);
      }
    }),

  edit: protectedProcedure
    .input(
      productSchema.merge(
        z.object({
          productsId: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const editedProduct = await ctx.db.products.update({
          where: {
            id: input.productsId,
          },
          data: {
            description: input.description,
            buyingPrice: input.buyingPrice,
            stockAvailable: input.stockAvailable,
            sellingPrice: input.sellingPrice,
            name: input.name,
          },
        });
        return editedProduct;
      } catch (cause) {
        console.log(cause);
      }
    }),
});
