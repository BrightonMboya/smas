"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/ui/Input";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import z from "zod";
import { useToast } from "~/utils/hooks/useToast";
import Button from "~/components/ui/Button";
import { api } from "~/utils/api";
import { debtsSchema } from "./newDebtSchema";
import { Spinner } from "~/components/ui/LoadingSkeleton";

export type IDebtsSchema = z.infer<typeof debtsSchema>;

export default function AddDebtForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDebtsSchema>({
    resolver: zodResolver(debtsSchema),
  });

  const { toast } = useToast();
  const { isLoading, mutateAsync } = api.debts.createNewDebt.useMutation({
    onSuccess: () => {
      toast({ description: "Debt Added Succesfully" });
      reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to add new debt",
      });
    },
  });

  const onSubmit: SubmitHandler<IDebtsSchema> = async (data) => {
    try {
      mutateAsync({
        ...data,
        
      });
    } catch (cause) {
      console.log(cause);
      toast({
        variant: "destructive",
        description: "Failed to add new debt",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
        <ItemLayout>
          <AssetLabel label="Debtor Name" />
          <div>
            <Input placeholder="John Doe" {...register("debtorName")} />
            {errors.debtorName && (
              <p className="text-sm text-red-500">Debtor Name is required</p>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Amount" />
          <div>
            <Input
              placeholder="500,000"
              {...register("amount", { valueAsNumber: true })}
              type="number"
            />
            {errors.amount && (
              <p className="text-sm text-red-500">Amount is required</p>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Date" />
          <div>
            <Input {...register("date", { valueAsDate: true })} type="date" />
            {errors.date && (
              <p className="text-sm text-red-500">Date is required</p>
            )}
          </div>
        </ItemLayout>
      </section>
      <Button className="mt-[20px] w-[100px] md:mt-[50px]" disabled={isLoading}>
        {isLoading && <Spinner/>}
        Save
      </Button>
    </form>
  );
}
