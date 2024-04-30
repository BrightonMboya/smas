import {z} from "zod";


export const invoiceSchema = z.object({
  invoiceName: z.string(),
  invoiceDate: z.date(),
  invoiceDueDate: z.date(),
  companyAdress: z.string(),
  clientAdress: z.string(),
  clientName: z.string(),
  companyName: z.string(),
  invoiceItems: z.array(
    z.object({
      itemName: z.string(),
      quantity: z.number(),
      amount: z.number(),
      rate: z.number(),
    }),
  ),
});

export const defaultInvoiceItems = [
  {
    itemName: "",
    quantity: 0,
    rate: 0,
    amount: 0,
  },
];

export type InvoiceSchema = z.infer<typeof invoiceSchema>;