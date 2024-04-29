"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/ui/Input";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import { addDebt } from "../_actions/debtsActions";
import z from "zod";
import { useToast } from "~/utils/hooks/useToast";
import Button from "~/components/ui/Button";
import { api } from "~/utils/api";

export const debtsSchema = z.object({
  debtorName: z.string().min(1),
  amount: z.number(),
  date: z.date(),
});

export type IDebtsSchema = z.infer<typeof debtsSchema>;

export default function AddDebtForm({
  organizations_id,
}: {
  organizations_id: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDebtsSchema>({
    resolver: zodResolver(debtsSchema),
  });

  const { toast } = useToast();
  const { isLoading, mutateAsync } = api.debts.add.useMutation({
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
      const res = await addDebt({
        debtorName: data.debtorName,
        amount: data.amount,
        date: data.date,
        organizations_id: organizations_id,
      });
      if (res.data) {
        console.log(data, "the data");
      }
      console.log(res.error, "error");
      // mutateAsync({
      //   ...data,
      //   organizationEmail: "",
      // });
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
        Save
      </Button>
    </form>
  );
}
