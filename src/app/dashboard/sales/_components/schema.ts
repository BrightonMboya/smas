import {z} from "zod";
export const salesSchema = z.object({
  customerName: z.string().min(1),
  amount: z.number().min(1),
  quantity: z.number().min(1),
  status: z.string().min(1),
  date: z.date(),
  productsId: z.string().min(1),
});

export type SalesSchema = z.infer<typeof salesSchema>;