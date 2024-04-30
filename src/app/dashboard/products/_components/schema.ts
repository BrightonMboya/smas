import z from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  buyingPrice: z.string().min(1),
  sellingPrice: z.string().min(1),
  stockAvailable: z.number().min(1),
  description: z.string().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
