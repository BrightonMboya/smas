"use client";
import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { productSchema, type ProductSchema } from "../_components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "~/components/ui/toaster";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const productId = searchParams?.get("productId");
  const { isLoading, data, isError } = api.products.fetchById.useQuery({
    productId: productId as unknown as string,
  });

  const { register, handleSubmit, setValue } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: data?.name,
      buyingPrice: data?.buyingPrice,
      sellingPrice: data?.sellingPrice,
      description: data?.description!,
      stockAvailable: data?.stockAvailable,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("buyingPrice", data?.buyingPrice);
      setValue("description", data?.description!);
      setValue("name", data?.name);
      setValue("sellingPrice", data?.sellingPrice);
      setValue("stockAvailable", data?.stockAvailable);
    }
  }, [data, setValue]);
  const { toast } = useToast();
  const utils = api.useUtils();
  const router = useRouter();

  const productsRouter = api.products.edit.useMutation({
    onSuccess: () => {
      toast({ description: "Product Edited Succesfully" });
    },
    onSettled: () => {
      utils.products.all.invalidate();
    },
    onMutate: (product) => {
      utils.products.all.cancel();
      const prevData = utils.products.all.getData();

      const updatedData = prevData?.map((item) => {
        if (item.id === product.productsId) {
          return {
            ...item,
            ...product,
          };
        }
        return item;
      });

      utils.products.all.setData(undefined, updatedData);
      return { prevData };
    },
    onError: (error, data, ctx) => {
      utils.products.all.setData(undefined, ctx?.prevData);
      toast({
        variant: "destructive",
        description: `Failed to edit product: ${error.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<ProductSchema> = (data) => {
    router.push("/dashboard/products");
    try {
      productsRouter.mutateAsync({
        ...data,
        productsId: productId as unknown as string,
      });
    } catch (cause) {
      console.log(cause);
    }
  };
  return (
    <>
      <Toaster />
      {isError || (!data && !isLoading && <h3>This product doesnt exist</h3>)}
      {isLoading && <LoadingSkeleton />}
      {data && (
        <form className="pt-[40px] pl-[70px]" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-2xl font-medium ">Editing Product</h3>
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
            disabled={productsRouter.isLoading}
          >
            Save
          </Button>
        </form>
      )}
    </>
  );
}
