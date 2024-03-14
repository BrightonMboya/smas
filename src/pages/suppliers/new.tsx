import React from "react";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";
import Layout from "~/components/Layout/Layout";
import { ItemLayout, AssetLabel } from "~/components/ui/ItemLayout";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/utils/hooks/useToast";

export const supplierSchema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),
  product: z.string(),
  company: z.string(),
  notes: z.string().optional(),
});

export type ISupplierSchema = z.infer<typeof supplierSchema>;

export default function Page() {
  const { register, handleSubmit, reset } = useForm<ISupplierSchema>({
    resolver: zodResolver(supplierSchema),
  });

  const { toast } = useToast();
  const { isLoading, mutateAsync } = api.supplier.add.useMutation({
    onSuccess: () => {
      toast({ description: "Supplier Added Succesfully" });
     reset()
    },
  });
  const onSubmit: SubmitHandler<ISupplierSchema> = (data) => {
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
        <h3 className="text-2xl font-medium ">New Supplier</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
            <ItemLayout>
              <AssetLabel label="Full Name" />
              <Input placeholder="John Doe" {...register("fullName")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Product" />
              <Input placeholder="Inyange Waters" {...register("product")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Phone Number" />
              <Input placeholder="+91 780348912" {...register("phoneNumber")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel
                label="Company"
                // caption="Gender of the guest as it appears in passport"
              />
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
          <Button className="mt-[50px] w-[100px]" disabled={isLoading}>
            Save
          </Button>
        </form>
      </main>
    </Layout>
  );
}
