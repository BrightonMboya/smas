"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/utils/api";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { type SalesSchema, salesSchema } from "../_components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "~/components/ui/toaster";
import LoadingSkeleton, { Spinner } from "~/components/ui/LoadingSkeleton";
import EditSaleForm from "../_components/EditSaleForm";

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
      setValue("status", data?.status);
    }
  }, [data, setValue]);
  const { toast } = useToast();
  const utils = api.useUtils();
  const router = useRouter();

  const salesRouter = api.sales.editSales.useMutation({
    onSuccess: () => {
      toast({ description: "Sale Edited Succesfully" });
    },
    onMutate: (sale) => {
      utils.sales.allSales.cancel();
      const prevData = utils.sales.allSales.getData();
      const updatedData = prevData?.map((item) => {
        if (item.id === sale.saleId) {
          return {
            sale,
          };
        } else {
          return item;
        }
      });
      utils.sales.allSales.setData(undefined, updatedData);
      return { prevData };
    },
    onSettled: () => {
      utils.sales.allSales.invalidate();
    },
    onError: (cause) => {
      toast({
        description: cause.message,
      });
    },
  });

  const onSubmit: SubmitHandler<SalesSchema> = (data) => {
    router.push("/dashboard/sales");
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
    <>
      <Toaster />
      {isLoading && <LoadingSkeleton />}
      {isError || (!data && !isLoading && <h3>This Sale doesnt exist</h3>)}
      {data && (
        <EditSaleForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          salesRouter={salesRouter}
        />
      )}
    </>
  );
}
