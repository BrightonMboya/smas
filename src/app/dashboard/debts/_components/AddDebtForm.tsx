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
import { Dispatch, SetStateAction } from "react";

export type IDebtsSchema = z.infer<typeof debtsSchema>;

interface Props {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddDebtForm(props: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDebtsSchema>({
    resolver: zodResolver(debtsSchema),
  });

  const { toast } = useToast();
  const utils = api.useUtils();

  const { isLoading, mutateAsync } = api.debts.createNewDebt.useMutation({
    onSuccess: () => {
      toast({ description: "Debt Added Succesfully" });
      reset();
      utils.debts.getAllDebts.invalidate();
      props.setDialogOpen(false)
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
      <section className="relative mt-5 flex flex-col space-y-[30px] ">
        <div className="space-y-3">
          <AssetLabel label="Debtor Name" />
          <div>
            <Input
              placeholder="John Doe"
              {...register("debtorName")}
              className="md:w-[400px]"
            />
            {errors.debtorName && (
              <p className="text-sm text-red-500">Debtor Name is required</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <AssetLabel label="Amount" />
          <div>
            <Input
              placeholder="500,000"
              {...register("amount", { valueAsNumber: true })}
              type="number"
              className="md:w-[400px]"
            />
            {errors.amount && (
              <p className="text-sm text-red-500">Amount is required</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <AssetLabel label="Date" />
          <div>
            <Input
              {...register("date", { valueAsDate: true })}
              type="date"
              className="md:w-[400px]"
            />
            {errors.date && (
              <p className="text-sm text-red-500">Date is required</p>
            )}
          </div>
        </div>
      </section>
      <Button className="mt-[20px] w-[200px] md:mt-[50px]" disabled={isLoading}>
        {isLoading && <Spinner />}
        Save
      </Button>
    </form>
  );
}
