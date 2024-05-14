"use client";
import Button from "~/components/ui/Button";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/Card";
import Input from "~/components/ui/Input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import ProductSelector from "~/components/accounting/ProductSelector";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "~/components/ui/toaster";
import {
  salesSchema,
  type SalesSchema,
} from "~/app/dashboard/sales/_components/schema";
import { ItemLayout } from "~/components/ui/ItemLayout";
import { useRouter } from "next/navigation";
import { Spinner } from "~/components/ui/LoadingSkeleton";

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
  const utils = api.useUtils();
  const router = useRouter();

  const { isLoading, mutateAsync } = api.sales.addSales.useMutation({
    onSuccess: () => {
      toast({ description: "New Sale Added Succesfully" });
      reset();
    },
    onMutate: (newSale) => {   
      // cancel outgoing fetches so that they dont overide the optimistic update
      utils.sales.allSales.cancel();

      // get the data from the query cache
      const prevData = utils.sales.allSales.getData();

      // optimistic update the data with our new sale
      utils.sales.allSales.setData(undefined, (old) => [
        // @ts-ignore
        ...old,
        newSale,
      ]);
      //  return the prev data so that we can revert once anything goes wrong
      return { prevData };
    },
    onSettled: () => {
      utils.sales.allSales.invalidate();
    },
    onError: (cause, newSale, ctx) => {
      utils.sales.allSales.setData(undefined, ctx?.prevData);
      toast({
        variant: "destructive",
        description: `Failed to create a sale ${cause.message}`,
      });
    },
  });
  const onSubmit: SubmitHandler<SalesSchema> = (data) => {
    router.push("/dashboard/sales");
    mutateAsync({
      ...data,
    });
  };
  return (
    <>
      <Toaster />
      <Card id="#sales" className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-center">New Sale</CardTitle>
          {/* <CardDescription>Input your sales details here</CardDescription> */}
        </CardHeader>
        <CardContent className="w-[500px]">
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <ItemLayout>
              <Label htmlFor="saleName">Customer Name</Label>
              <div>
                <Input
                  id="saleName"
                  placeholder="Customer Name"
                  {...register("customerName")}
                  className="md:w-[400px]"
                />
                {errors?.customerName && (
                  <p className="text-sm text-red-500">
                    A customer Name is required
                  </p>
                )}
              </div>
            </ItemLayout>

            <ItemLayout>
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
            </ItemLayout>

            <ItemLayout>
              <Label htmlFor="saleDate">Date</Label>
              <div>
                <Input
                  id="saleDate"
                  placeholder="Date"
                  type="date"
                  {...register("date", { valueAsDate: true })}
                  className="md:w-[400px]"
                />
                {errors?.date && (
                  <p className="text-sm text-red-500">
                    A date of sale is required
                  </p>
                )}
              </div>
            </ItemLayout>

            <ItemLayout>
              <Label htmlFor="saleAmount">Selling Price</Label>
              <div>
                <Input
                  id="saleAmount"
                  placeholder="450,000"
                  type="number"
                  {...register("amount", { valueAsNumber: true })}
                  className="md:w-[400px]"
                />
                {errors?.amount && (
                  <p className="text-sm text-red-500">
                    How much are you selling this product for?
                  </p>
                )}
              </div>
            </ItemLayout>

            <ItemLayout>
              <Label>Quantity</Label>
              <div>
                <Input
                  id="saleAmount"
                  placeholder="10"
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  className="md:w-[400px]"
                />
                {errors?.quantity && (
                  <p className="text-sm text-red-500">
                    How many pcs of this product are you selling
                  </p>
                )}
              </div>
            </ItemLayout>

            <ItemLayout>
              <Label htmlFor="description">Status</Label>
              <div>
                <Input
                  id="description"
                  placeholder="Cash"
                  {...register("status")}
                  className="md:w-[400px]"
                />
                {errors?.status && (
                  <p className="text-sm text-red-500">
                    Is this sale cash or a loan?
                  </p>
                )}
              </div>
            </ItemLayout>

            <Button className="md:w-[200px]" type="submit" disabled={isLoading}>
              {isLoading && (
                <span className="pr-5">
                  {" "}
                  <Spinner />
                </span>
              )}
              Submit Sale
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
