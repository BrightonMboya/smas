import React from "react";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";
import Layout from "~/components/Layout/Layout";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { AppRouter } from "~/server/api/root";
import { inferProcedureInput } from "@trpc/server";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/utils/hooks/useToast";
import { ToastAction } from "~/components/ui/Toast";

export const productSchema = z.object({
  name: z.string(),
  buyingPrice: z.string(),
  sellingPrice: z.string(),
  stockAvailable: z.number(),
  description: z.string().optional(),
});

type ProductSchema = z.infer<typeof productSchema>;

export default function Page() {
  const {
    reset,
    formState: errors,
    handleSubmit,
    register,
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });
  const { toast } = useToast();
  const { isLoading, mutateAsync } = api.products.add.useMutation({
    onSuccess: () => {
      toast({
        description: "Product added successfully",
      });
      reset()
    },
    onError: (error) => {
       toast({
         variant: "destructive",
         title: "Uh oh! Something went wrong.",
         description: `${error.message}`,
         action: <ToastAction altText="Try again">Try again</ToastAction>,
         duration: 1500,
       });
    }
  });

  const onSubmit: SubmitHandler<ProductSchema> = (data) => {
    type Input = inferProcedureInput<AppRouter["products"]["add"]>;
    const productData: Input = {
      name: data.name,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
      description: data.description,
      stockAvailable: data.stockAvailable,
    };
    try {
      mutateAsync(productData);
    } catch (cause) {
      console.log(cause);
    }
  };
  return (
    <Layout>
      <Toaster />
      <form className="mt-[40px] pl-[30px]" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-2xl font-medium ">New Product</h3>
        <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
          <ItemLayout>
            <AssetLabel label="Product Name" />
            <Input placeholder="Cement bags" {...register("name")} />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Stock Available" />
            <Input
              placeholder="20"
              {...register("stockAvailable", { valueAsNumber: true })}
              type="number"
            />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Buying Price" />
            <Input placeholder="200,000" {...register("buyingPrice")} />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Selling Price" />
            <Input placeholder="300,000" {...register("sellingPrice")} />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Notes"
              caption="Enter additional details about this product"
            />

            <Textarea
              placeholder="Add short notes about this product"
              {...register("description")}
            />
          </ItemLayout>
        </section>
        <Button
          className="mt-[50px] w-[100px]"
          type="submit"
          disabled={isLoading}
        >
          Save
        </Button>
      </form>
    </Layout>
  );
}
