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
import { useUser } from "@clerk/nextjs";

export const productSchema = z.object({
  name: z.string().min(1),
  buyingPrice: z.string().min(1),
  sellingPrice: z.string().min(1),
  stockAvailable: z.number().min(1),
  description: z.string().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;

export default function Page() {
  const {
    reset,
    formState: { errors },
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
      reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 1500,
      });
    },
  });

  const user = useUser();

  const onSubmit: SubmitHandler<ProductSchema> = (data) => {
    type Input = inferProcedureInput<AppRouter["products"]["add"]>;
    const productData: Input = {
      name: data.name,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
      description: data.description,
      stockAvailable: data.stockAvailable,
      organizationEmail: user?.user?.primaryEmailAddress
        ?.emailAddress as unknown as string,
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
            <div>
              <Input placeholder="Cement bags" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">Product Name is required</p>
              )}
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Stock Available" />
            <div>
              <Input
                placeholder="20"
                {...register("stockAvailable", { valueAsNumber: true })}
                type="number"
              />
              {errors.stockAvailable && (
                <p className="text-sm text-red-500">Stock is required</p>
              )}
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Buying Price" />
            <div>
              <Input placeholder="200,000" {...register("buyingPrice")} />
              {errors.buyingPrice && (
                <p className="text-sm text-red-500">Buying Price is required</p>
              )}
            </div>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Selling Price" />
            <div>
              <Input placeholder="300,000" {...register("sellingPrice")} />
              {errors.sellingPrice && (
                <p className="text-sm text-red-500">
                  Selling Price is required
                </p>
              )}
            </div>
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
          className="mt-[20px] w-[100px] md:mt-[50px]"
          type="submit"
          disabled={isLoading}
        >
          Save
        </Button>
      </form>
    </Layout>
  );
}
