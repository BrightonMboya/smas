import z from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { invoiceSchema } from "~/components/invoices/newForm/newInvoiceForm";

export const invoices = createTRPCRouter({
  create: publicProcedure
    .input(invoiceSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Extract invoice items from input
        const { invoiceItems, ...invoiceData } = input;

        // Create invoice
        const newInvoice = await ctx.db.invoices.create({
          data: {
            ...invoiceData,
            invoiceItems: {
              createMany: {
                data: invoiceItems,
              },
            },
          },
        });

        return newInvoice;
      } catch (cause) {
        console.log(cause);
      }
    }),
});
