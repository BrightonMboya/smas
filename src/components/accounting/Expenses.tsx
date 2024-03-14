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

export const expensesSchema = z.object({
  name: z.string(),
  date: z.date(),
  amount: z.number(),
  description: z.string().optional(),
});

export type ExpensesSchema = z.infer<typeof expensesSchema>;

export default function Expenses() {
  const { register, handleSubmit, reset } = useForm<ExpensesSchema>({
    resolver: zodResolver(expensesSchema),
  });
  const { toast } = useToast();
  const { isLoading, mutateAsync } = api.accounting.addExpense.useMutation({
    onSuccess: () => {
      toast({ description: "Expense Added Succesfully" });
      reset();
    },
  });

  const onSubmit: SubmitHandler<ExpensesSchema> = (data) => {
    try {
      mutateAsync(data);
    } catch (cause) {
      console.log(cause);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Expenses</CardTitle>
        <CardDescription>Input your expenses details here</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="expenseName">Expense Name</Label>
          <Input
            id="expenseName"
            placeholder="Expense Name"
            {...register("name")}
          />
          <Label htmlFor="expenseDate">Date</Label>
          <Input
            id="expenseDate"
            placeholder="Date"
            type="date"
            {...register("date", { valueAsDate: true })}
          />
          <Label htmlFor="expenseAmount">Amount</Label>
          <Input
            id="expenseAmount"
            placeholder="Amount"
            type="number"
            {...register("amount", { valueAsNumber: true })}
          />
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Made a huge profit here ..."
            {...register("description")}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            Submit Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
