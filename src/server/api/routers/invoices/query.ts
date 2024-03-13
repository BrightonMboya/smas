import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";
import { CANT_MUTATE_ERROR } from "../trips/newTrip";


export const query = createTRPCRouter({
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
            tinNumber: true,
            Date: true,
            companyAdress: true,
            billingAdress: true,
            clientName: true,
            bankName: true,
            bankCustomerName: true,
            accNo: true,
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
        throw CANT_MUTATE_ERROR;
      }
    }),

  queryByOrganization: protectedProcedure
    .input(
      z.object({
        organizationEmail: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        const invoices = await ctx.db.invoices.findMany({
          where: {
            organizationsId: organizationId?.id,
          },

          select: {
            id: true,
            invoiceName: true,
            Date: true,
            clientName: true,
            status: true,
            organizationsId: true,
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
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
