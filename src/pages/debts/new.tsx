import React from "react";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import Layout from "~/components/Layout/Layout";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/utils/hooks/useToast";
import Link from "next/link";

export const debtsSchema = z.object({
  debtorName: z.string().min(1),
  amount: z.number(),
  date: z.date(),
});

export type IDebtsSchema = z.infer<typeof debtsSchema>;

export default function Page() {
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
  });
  const onSubmit: SubmitHandler<IDebtsSchema> = (data) => {
    try {
      mutateAsync(data);
    } catch (cause) {
      console.log(cause);
    }
  };
  return (
    <Layout>
      <Toaster />
      <main className="mt-[40px] pl-[30px]">
        <div className="flex w-[1000px] items-center justify-between pt-[30px] ">
          <h3 className="text-3xl font-medium ">New Debt </h3>
          <div className="flex items-center gap-2">
            <Link href="/debts/">
              <Button>View all Debts</Button>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
            <ItemLayout>
              <AssetLabel label="Debtor Name" />
              <div>
                <Input placeholder="John Doe" {...register("debtorName")} />
                {errors.debtorName && (
                  <p className="text-sm text-red-500">
                    Debtor Name is required
                  </p>
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
                <Input
                  {...register("date", { valueAsDate: true })}
                  type="date"
                />
                {errors.date && (
                  <p className="text-sm text-red-500">Date is required</p>
                )}
              </div>
            </ItemLayout>
          </section>
          <Button className="mt-[50px] w-[100px]" disabled={isLoading}>
            Save
          </Button>
        </form>
      </main>
    </Layout>
  );
}
