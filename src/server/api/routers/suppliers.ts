import { publicProcedure, createTRPCRouter } from "../trpc";
import { supplierSchema } from "~/pages/suppliers/new";
import z from "zod";

export const supplier = createTRPCRouter({
  add: publicProcedure
    .input(supplierSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.suppliers.create({
          data: {
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

  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.suppliers.findMany();
  }),

  delete: publicProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.suppliers.delete({
        where: {
          id: input.productId,
        },
      });
    }),
});
