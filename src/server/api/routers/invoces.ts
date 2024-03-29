import z from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { invoiceSchema } from "~/components/invoices/newForm/newInvoiceForm";
import { organizationEmailSchema } from "~/utils/constants";
import useOrganizationId from "~/utils/hooks/useOrganizationId";

export const invoices = createTRPCRouter({
  create: publicProcedure
    .input(invoiceSchema.merge(organizationEmailSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const organizationId = await useOrganizationId(input.organizationEmail);
        // Extract invoice items from input
        const { invoiceItems, organizationEmail, ...invoiceData } = input;

        // Create invoice
        const newInvoice = await ctx.db.invoices.create({
          data: {
            ...invoiceData,
            organizationsId: organizationId.id!,
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

  all: publicProcedure
    .input(organizationEmailSchema)
    .query(async ({ input, ctx }) => {
      const organizationId = await useOrganizationId(input.organizationEmail);
      // return await ctx.db.invoices.findMany();
      const invoices = await ctx.db.invoices.findMany({
        where: {
          organizationsId: organizationId?.id,
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
  queryById: publicProcedure
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
