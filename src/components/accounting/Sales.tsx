import Button from "../ui/Button";
import { Label } from "../ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import Input from "../ui/Input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import ProductSelector from "./ProductSelector";
import { useToast } from "~/utils/hooks/useToast";

export const salesSchema = z.object({
  customerName: z.string(),
  amount: z.number(),
  quantity: z.number(),
  status: z.string(),
  date: z.date(),
  productsId: z.string(),
});

export type SalesSchema = z.infer<typeof salesSchema>;

export default function Sales() {
  const { reset, register, handleSubmit, control } = useForm<SalesSchema>({
    resolver: zodResolver(salesSchema),
  });

  const { toast } = useToast();
  const { isLoading, mutateAsync } = api.accounting.addSales.useMutation({
    onSuccess: () => {
      toast({ description: "Sales Added Succesfully" });
      reset();
    },
  });
  const onSubmit: SubmitHandler<SalesSchema> = (data) => {
    mutateAsync(data);
  };
  return (
    <Card id="#sales">
      <CardHeader>
        <CardTitle>Record Sales</CardTitle>
        <CardDescription>Input your sales details here</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="saleName">Customer Name</Label>
          <Input
            id="saleName"
            placeholder="Customer Name"
            {...register("customerName")}
          />
          <Label htmlFor="saleName">Product Name</Label>
          <Controller
            control={control}
            name="productsId"
            //@ts-expect-error
            render={({ field }) => <ProductSelector field={field} />}
          />
          <Label htmlFor="saleDate">Date</Label>
          <Input
            id="saleDate"
            placeholder="Date"
            type="date"
            {...register("date", { valueAsDate: true })}
          />

          <Label htmlFor="saleAmount">Selling Price</Label>
          <Input
            id="saleAmount"
            placeholder="450,000"
            type="number"
            {...register("amount", { valueAsNumber: true })}
          />

          <Label htmlFor="saleAmount">Quantity</Label>
          <Input
            id="saleAmount"
            placeholder="10"
            type="number"
            {...register("quantity", { valueAsNumber: true })}
          />

          <Label htmlFor="description">Status</Label>
          <Input id="description" placeholder="Cash" {...register("status")} />
          <Button className="w-full" type="submit" disabled={isLoading}>
            Submit Sale
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
