"use client"
import React from "react";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/utils/hooks/useToast";
import Link from "next/link";
import { supplierSchema, ISupplierSchema } from "../_components/schema";


export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISupplierSchema>({
    resolver: zodResolver(supplierSchema),
  });

  const { toast } = useToast();
  const { isLoading, mutateAsync } = api.supplier.add.useMutation({
    onSuccess: () => {
      toast({ description: "Supplier Added Succesfully" });
      reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to add the new supplier",
      });
    },
  });

  const onSubmit: SubmitHandler<ISupplierSchema> = (data) => {
    try {
      mutateAsync({
        ...data,
        
      });
    } catch (cause) {
      console.log(cause);
    }
  };
  return (
    <>
      <Toaster />
      <main className="mt-[40px] pl-[30px]">
        <div className="flex items-center space-x-10 pt-[30px] md:w-[1000px] md:justify-between  ">
          <h3 className="text-3xl font-medium ">New Supplier </h3>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/suppliers/">
              <Button>View Suppliers</Button>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
            <ItemLayout>
              <AssetLabel label="Full Name" />
              <div>
                <Input placeholder="John Doe" {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-sm text-red-500">Full Name is required</p>
                )}
              </div>
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Product Name" />
              <div>
                <Input placeholder="Inyange Waters" {...register("product")} />
                {errors.product && (
                  <p className="text-sm text-red-500">
                    Product Name is required
                  </p>
                )}
              </div>
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Phone Number" />
              <div>
                <Input
                  placeholder="+91 780348912"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">
                    Phone Number is required
                  </p>
                )}
              </div>
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Company" />
              <div>
                <Input placeholder="Inyange Inc" {...register("company")} />
                {errors.company && (
                  <p className="text-sm text-red-500">
                    Company Name is required
                  </p>
                )}
              </div>
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
          <Button className="md:mt-[50px] mt-[20px] w-[100px]" disabled={isLoading}>
            Save
          </Button>
        </form>
      </main>
    </>
  );
}
