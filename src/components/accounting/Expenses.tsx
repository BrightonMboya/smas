"use client";
import Button from "~/components/ui/Button";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import Input from "../ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "../ui/toaster";

import {
  expensesSchema,
  ExpensesSchema,
} from "~/app/dashboard/expenses/_components/_schema/expensesSchema";
import { Spinner } from "../ui/LoadingSkeleton";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Expenses(props: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpensesSchema>({
    resolver: zodResolver(expensesSchema),
  });
  const { toast } = useToast();
  const utils = api.useUtils();

  const { isLoading, mutateAsync } = api.accounting.addExpense.useMutation({
    onSuccess: () => {
      toast({ description: "Expense Added Succesfully" });
      reset();
    },
    onSettled: () => {
      // sync with the server once the mutation is settled
      utils.accounting.allExpenses.invalidate();
    },
    onMutate: (newExpense) => {
      // cancel outgoing fetches so that they dont overide the optimistic update
      utils.accounting.allExpenses.cancel();

      // get the data from the query cache
      const prevData = utils.accounting.allExpenses.getData();

      // optimistic update the data with our new expense
      utils.accounting.allExpenses.setData(undefined, (old) => [
        // @ts-ignore
        ...old,
        newExpense,
      ]);
      //  return the prev data so that we can revert once anything goes wrong
      return { prevData };
    },
    onError: (error, newExpense, ctx) => {
      // if the mutation fails, use the context-value from on-mutate
      utils.accounting.allExpenses.setData(undefined, ctx?.prevData);
      toast({
        variant: "destructive",
        description: `Failed to record the new expense: ${error.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<ExpensesSchema> = (data) => {
    try {
      props.setDialogOpen(false);
      mutateAsync({
        ...data,
      });
    } catch (cause) {
      console.log(cause);
      toast({
        variant: "destructive",
        description: `Failed to record the new expense`,
      });
    }
  };
  return (
    <>
      <Toaster />

      <Card className="w-[400px] border-none shadow-none md:max-w-xl">
        <CardHeader>
          <CardTitle>Record Expenses</CardTitle>
          <CardDescription>Input your expenses details here</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="expenseName">Expense Name</Label>
            <div>
              <Input
                id="expenseName"
                placeholder="Expense Name"
                {...register("name")}
              />
              {errors?.name && (
                <p className="text-sm text-red-500">
                  The expense name is required
                </p>
              )}
            </div>
            <Label htmlFor="expenseDate">Date</Label>
            <div>
              <Input
                id="expenseDate"
                placeholder="Date"
                type="date"
                {...register("date", { valueAsDate: true })}
              />
              {errors?.date && (
                <p className="text-sm text-red-500">Date is required</p>
              )}
            </div>
            <Label htmlFor="expenseAmount">Amount</Label>
            <div>
              <Input
                id="expenseAmount"
                placeholder="Amount"
                type="number"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors?.amount && (
                <p className="text-sm text-red-500">
                  The expense amount is required
                </p>
              )}
            </div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Made a huge profit here ..."
              {...register("description")}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              Submit Expense
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
