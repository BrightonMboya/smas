"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { AppRouter } from "~/server/api/root";
import { inferProcedureInput } from "@trpc/server";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/utils/hooks/useToast";
import { ToastAction } from "~/components/ui/Toast";
import { ProductSchema, productSchema } from "../_components/schema";
import { useRouter } from "next/navigation";
import AddProductForm from "../_components/AddProductForm";

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
  const utils = api.useUtils();
  const router = useRouter();

  const { isLoading, mutateAsync } = api.products.add.useMutation({
    onSuccess: () => {
      toast({
        description: "Product added successfully",
      });
      reset();
    },
    onSettled: () => {
      utils.products.all.invalidate();
    },
    onMutate: (product) => {
      utils.products.all.cancel();

      const prevData = utils.products.all.getData();
      utils.products.all.setData(undefined, (old) => [
        // @ts-ignore
        ...old, product]);
      return { prevData };
    },
    onError: (error, data, ctx) => {
      utils.products.all.setData(undefined, ctx?.prevData);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 1500,
      });
    },
  });

  const onSubmit: SubmitHandler<ProductSchema> = (data) => {
    router.push("/dashboard/products");
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
    <section className="pt-10 flex flex-col items-center">
      <Toaster />
      <AddProductForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}
