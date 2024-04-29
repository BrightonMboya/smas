import { z } from "zod";

export const supplierSchema = z.object({
  fullName: z.string().min(1),
  phoneNumber: z.string().min(1),
  product: z.string().min(1),
  company: z.string().min(1),
  notes: z.string().optional(),
});

export type ISupplierSchema = z.infer<typeof supplierSchema>;
