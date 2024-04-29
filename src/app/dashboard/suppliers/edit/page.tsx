"use client";
import Layout from "~/components/Layout/Layout";
import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { type ISupplierSchema, supplierSchema } from "../_components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "~/components/ui/toaster";
import LoadingSkeleton, { Spinner } from "~/components/ui/LoadingSkeleton";

export default function Page() {
  const searchParams = useSearchParams();
  const supplierId = searchParams?.get("supplierId") as unknown as string;
  const { isLoading, data, isError } = api.supplier.fetchSupplierById.useQuery({
    supplierId: supplierId,
  });

  const { register, handleSubmit, setValue } = useForm<ISupplierSchema>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      fullName: data?.fullName,
      phoneNumber: data?.phoneNumber,
      product: data?.product,
      company: data?.company,
      notes: data?.notes || "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("fullName", data?.fullName),
        setValue("phoneNumber", data?.phoneNumber),
        setValue("product", data?.product),
        setValue("company", data?.company),
        setValue("notes", data?.notes || "");
    }
  }, [data, setValue]);

  const { toast } = useToast();

  const supplierRouter = api.supplier.editSupplier.useMutation({
    onSuccess: () => {
      toast({ description: "Supplier Edited Succesfully" });
    },
    onError: (cause) => {
      toast({
        description: cause.message,
      });
    },
  });

  const onSubmit: SubmitHandler<ISupplierSchema> = (data) => {
    try {
      supplierRouter.mutateAsync({
        ...data,
        supplierId: supplierId,
      });
    } catch (cause) {
      console.log(cause);
    }
  };

  return (
    <Layout>
      <Toaster />
      {isLoading && <LoadingSkeleton />}
      {isError || (!data && !isLoading && <h3>This Supplier doesnt exist</h3>)}
      {data && (
        <form className="mt-[40px] pl-[30px]" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-2xl font-medium ">Editing a Supplier</h3>

          <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
            <ItemLayout>
              <AssetLabel label="Full Name" />
              <Input placeholder="Supplier Name" {...register("fullName")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Phone Number" />
              <Input
                placeholder="+2507809321763"
                {...register("phoneNumber")}
              />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Product" />
              <Input placeholder="Inyange Juice" {...register("product")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Company" />
              <Input placeholder="Inyange Inc" {...register("company")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel
                label="Notes"
                caption="Enter additional details about this contact"
              />

              <Textarea
                placeholder="Add short notes about this contact"
                {...register("notes")}
              />
            </ItemLayout>
          </section>

          <Button
            className="mt-[50px] w-[100px]"
            type="submit"
            disabled={supplierRouter.isLoading}
          >
            {supplierRouter.isLoading && <Spinner/>}
            Save
          </Button>
        </form>
      )}
    </Layout>
  );
}
