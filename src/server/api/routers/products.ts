import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { productSchema } from "~/pages/products/new";
import {
  FAILED_TO_CREATE,
  NOT_FOUND,
  organizationEmailSchema,
} from "~/utils/constants";
import useOrganizationId from "~/utils/hooks/useOrganizationId";

export const products = createTRPCRouter({
  add: publicProcedure
    .input(productSchema.merge(organizationEmailSchema))
    .mutation(async ({ input, ctx }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        const newProduct = await ctx.db.products.create({
          data: {
            name: input.name,
            buyingPrice: input.buyingPrice,
            sellingPrice: input.sellingPrice,
            stockAvailable: input.stockAvailable,
            description: input.description,
            organizationsId: organizationId?.id!,
          },
        });
        return newProduct;
      } catch (cause) {
        console.log(cause);
        throw FAILED_TO_CREATE;
      }
    }),

  all: publicProcedure
    .input(organizationEmailSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.products.findMany({
          where: {
            Organizations: {
              emailAddress: input.organizationEmail,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (cause) {
        console.log(cause);
        throw NOT_FOUND;
      }
    }),

  delete: publicProcedure
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

  fetchById: publicProcedure
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

  edit: publicProcedure
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
