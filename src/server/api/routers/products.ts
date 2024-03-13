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
});
