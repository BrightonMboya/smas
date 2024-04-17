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
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "../ui/toaster";
import { useUser } from "@clerk/nextjs";

export const expensesSchema = z.object({
  name: z.string().min(1),
  date: z.date(),
  amount: z.number().min(1),
  description: z.string().optional(),
});

export type ExpensesSchema = z.infer<typeof expensesSchema>;

export default function Expenses() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpensesSchema>({
    resolver: zodResolver(expensesSchema),
  });
  const { toast } = useToast();
  const { user } = useUser();
  const { isPending, mutateAsync } = api.accounting.addExpense.useMutation({
    onSuccess: () => {
      toast({ description: "Expense Added Succesfully" });
      reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to record the new expense",
      });
    },
  });

  const onSubmit: SubmitHandler<ExpensesSchema> = (data) => {
    try {
      mutateAsync({
        ...data,
        organizationEmail: user?.primaryEmailAddress
          ?.emailAddress as unknown as string,
      });
    } catch (cause) {
      console.log(cause);
      toast({
        variant: "destructive",
        description: "Failed to record the new expense",
      });
    }
  };
  return (
    <>
      <Toaster />

      <Card className="w-[400px] md:max-w-xl">
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
            <Button className="w-full" type="submit" disabled={isPending}>
              Submit Expense
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
