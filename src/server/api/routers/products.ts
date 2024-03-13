import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { productSchema } from "~/pages/products/new";

export const products = createTRPCRouter({
  add: publicProcedure.input(productSchema).mutation(async ({ input, ctx }) => {
    try {
      const newProduct = await ctx.db.products.create({
        data: input,
      });
      return newProduct;
    } catch (cause) {
      console.log(cause);
    }
  }),

  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.products.findMany();
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
});
