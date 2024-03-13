import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { CANT_MUTATE_ERROR } from "../trips/newTrip";

export const edit = createTRPCRouter({
  markAsPaid: protectedProcedure
    .input(
      z.object({
        invoiceId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedInvoice = await ctx.db.invoices.update({
          where: {
            id: input.invoiceId,
          },
          data: {
            status: true,
          },
        });
        return updatedInvoice;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});


