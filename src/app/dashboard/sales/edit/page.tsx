"use client";
import Layout from "~/components/Layout/Layout";
import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import { SubmitHandler, useForm } from "react-hook-form"
import { type SalesSchema, salesSchema } from "../_components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "~/components/ui/toaster";
import LoadingSkeleton, { Spinner } from "~/components/ui/LoadingSkeleton";

export default function Page() {
  const searchParams = useSearchParams();
  const saleId = searchParams?.get("salesId") as unknown as string;

  const { isLoading, data, isError } = api.sales.fetchSalesById.useQuery({
    salesId: saleId,
  });

  const { register, handleSubmit, setValue } = useForm<SalesSchema>({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      customerName: data?.customerName,
      amount: data?.amount,
      quantity: data?.quantity,
      status: data?.status,
      date: data?.date,
      productsId: data?.productsId,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("amount", data?.amount),
        setValue("customerName", data?.customerName),
        setValue("date", data?.date),
        setValue("quantity", data?.quantity),
        setValue("productsId", data?.productsId);
        setValue("status", data?.status)
    }
  }, [data, setValue]);
  const { toast } = useToast();

  const salesRouter = api.sales.editSales.useMutation({
    onSuccess: () => {
      toast({ description: "Sale Edited Succesfully" });
    },
    onError: (cause) => {
      toast({
        description: cause.message,
      });
    },
  });

  const onSubmit: SubmitHandler<SalesSchema> = (data) => {
    try {
      salesRouter.mutateAsync({
        ...data,
        saleId: saleId,
      });
    } catch (cause) {
      console.log(cause);
    }
  };
  return (
    <Layout>
      <Toaster />
      {isLoading && <LoadingSkeleton />}
      {isError || (!data && !isLoading && <h3>This Sale doesnt exist</h3>)}
      {data && (
        <form className="mt-[40px] pl-[30px]" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-2xl font-medium ">Editing a Sale</h3>
          <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
            <ItemLayout>
              <AssetLabel label="Customer Name" />
              <Input placeholder="Inyange Inc" {...register("customerName")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Amount" />
              <Input
                placeholder="20"
                className="placeholder:text-gray-400"
                {...register("amount", { valueAsNumber: true })}
                type="number"
              />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Quantity" />
              <Input
                placeholder="20"
                className="placeholder:text-gray-400"
                {...register("quantity", { valueAsNumber: true })}
                type="number"
              />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Status" />
              <Input placeholder="Cash" {...register("status")} />
            </ItemLayout>

            <ItemLayout>
              {/* <AssetLabel label="Date" /> */}
              <Input
                placeholder=""
                type="date"
                className="hidden"
                // defaultValue={data?.date as unknown as string}
                {...register("date", { valueAsDate: true })}
              />
            </ItemLayout>

            <Input
              className="hidden"
              placeholder=""
              {...register("productsId")}
            />
          </section>
          <Button
            className="mt-[50px] w-[100px]"
            type="submit"
            disabled={salesRouter.isLoading}
          >
            {salesRouter.isLoading && <Spinner/>}
            Save
          </Button>
        </form>
      )}
    </Layout>
  );
}
