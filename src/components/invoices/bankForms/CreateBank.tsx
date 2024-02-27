import { z } from "zod";

export const bankSchema = z.object({
  country: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  accountHolderName: z.string(),
  currency: z.string(),
});
