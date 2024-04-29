import z from "zod";


export const debtsSchema = z.object({
  debtorName: z.string().min(1),
  amount: z.number(),
  date: z.date(),
});
