import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { invoiceSchema } from "~/components/invoices/newForm/schema";


export const invoices = createTRPCRouter({
  create: protectedProcedure
    .input(invoiceSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Extract invoice items from input
        const { invoiceItems, ...invoiceData } = input;

        // Create invoice
        const newInvoice = await ctx.db.invoices.create({
          data: {
            ...invoiceData,
            // @ts-ignore
            organization_id: ctx.user?.id,
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

  all: protectedProcedure
    
    .query(async ({ input, ctx }) => {
      // return await ctx.db.invoices.findMany();
      const invoices = await ctx.db.invoices.findMany({
        where: {
          // @ts-ignore
          organization_id: ctx.user?.id
        },
        select: {
          id: true,
          invoiceName: true,
          clientName: true,
          invoiceDate: true,
          invoiceDueDate: true,
          invoiceItems: {
            select: {
              amount: true,
            },
          },
        },
      });

      // calculating the total amount for each invoice
      const invoicesWithAmount = invoices.map((invoice) => ({
        ...invoice,
        totalAmount: invoice.invoiceItems.reduce(
          (sum, item) => sum + item.amount,
          0,
        ),
      }));

      return invoicesWithAmount;
    }),
  queryById: protectedProcedure
    .input(
      z.object({
        invoiceId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const invoice = await ctx.db.invoices.findUnique({
          where: {
            id: input.invoiceId,
          },
          select: {
            id: true,
            invoiceName: true,
            invoiceDate: true,
            invoiceDueDate: true,
            companyAdress: true,
            clientAdress: true,
            clientName: true,

            invoiceItems: true,
          },
        });
        // Calculate the totalAmount for the specific invoice
        const totalAmount = invoice?.invoiceItems.reduce(
          (sum, item) => sum + item.amount,
          0,
        );
        return {
          ...invoice,
          totalAmount,
        };
      } catch (cause) {
        console.log(cause);
        // throw CANT_MUTATE_ERROR;
      }
    }),
});
