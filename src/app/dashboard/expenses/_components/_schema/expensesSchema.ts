import { z } from "zod";

export const expensesSchema = z.object({
  name: z.string().min(1),
  date: z.date(),
  amount: z.number().min(1),
  description: z.string().optional(),
});

export type ExpensesSchema = z.infer<typeof expensesSchema>;
