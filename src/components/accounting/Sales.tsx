"use client"
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
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import ProductSelector from "./ProductSelector";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "../ui/toaster";
import { salesSchema, type SalesSchema } from "~/app/dashboard/sales/_components/schema";



export default function Sales() {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SalesSchema>({
    resolver: zodResolver(salesSchema),
  });

  const { toast } = useToast();
  const { isLoading, mutateAsync } = api.sales.addSales.useMutation({
    onSuccess: () => {
      toast({ description: "Sales Added Succesfully" });
      reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to create a sale",
      });
    },
  });
  const onSubmit: SubmitHandler<SalesSchema> = (data) => {
    mutateAsync({
      ...data,
      
    });
  };
  return (
    <>
      <Toaster />
      <Card id="#sales" className="w-[400px] md:max-w-xl">
        <CardHeader>
          <CardTitle>Record Sales</CardTitle>
          <CardDescription>Input your sales details here</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="saleName">Customer Name</Label>

            <div>
              <Input
                id="saleName"
                placeholder="Customer Name"
                {...register("customerName")}
              />
              {errors?.customerName && (
                <p className="text-sm text-red-500">
                  A customer Name is required
                </p>
              )}
            </div>
            <Label htmlFor="saleName">Product Name</Label>

            <div>
              <Controller
                control={control}
                name="productsId"
                render={({ field }) => <ProductSelector field={field} />}
              />
              {errors?.productsId && (
                <p className="text-sm text-red-500">
                  You haven't selected the product to sale
                </p>
              )}
            </div>
            <Label htmlFor="saleDate">Date</Label>
            <div>
              <Input
                id="saleDate"
                placeholder="Date"
                type="date"
                {...register("date", { valueAsDate: true })}
              />
              {errors?.date && (
                <p className="text-sm text-red-500">
                  A date of sale is required
                </p>
              )}
            </div>

            <Label htmlFor="saleAmount">Selling Price</Label>
            <div>
              <Input
                id="saleAmount"
                placeholder="450,000"
                type="number"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors?.amount && (
                <p className="text-sm text-red-500">
                  How much are you selling this product for?
                </p>
              )}
            </div>

            <Label>Quantity</Label>
            <div>
              <Input
                id="saleAmount"
                placeholder="10"
                type="number"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors?.quantity && (
                <p className="text-sm text-red-500">
                  How many pcs of this product are you selling
                </p>
              )}
            </div>

            <Label htmlFor="description">Status</Label>
            <div>
              <Input
                id="description"
                placeholder="Cash"
                {...register("status")}
              />
              {errors?.status && (
                <p className="text-sm text-red-500">
                  Is this sale cash or a loan?
                </p>
              )}
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              Submit Sale
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
