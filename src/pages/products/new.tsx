import React from "react";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";
import { DatePicker } from "~/components/ui/DatePicker";
import { GenderDropDown } from "~/components/contacts/GenderDropDown";
import Layout from "~/components/Layout/Layout";

export function AssetLabel({
  label,
  caption,
}: {
  label: string;
  caption?: string;
}) {
  return (
    <div className="max-w-[400px] ">
      <h3 className="text-base font-medium">{label}</h3>
      <h3 className="text-sm">{caption}</h3>
    </div>
  );
}

export function ItemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 items-center gap-[50px]">{children}</div>
  );
}

export default function Page() {
  return (
    <Layout>
      <main className="mt-[40px] pl-[30px]">
        <h3 className="text-2xl font-medium ">New Product</h3>
        <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
          <ItemLayout>
            <AssetLabel label="Product Name" />
            <Input placeholder="Cement bags" />
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Supplier" />
            <Input placeholder="Sina Gerald" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Quantity" />
            <Input placeholder="20" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Price" />
            <Input placeholder="200,000" />
          </ItemLayout>

        

          <ItemLayout>
            <AssetLabel
              label="Notes"
              caption="Enter additional details about this product"
            />

            <Textarea placeholder="Add short notes about this product" />
          </ItemLayout>
        </section>
        <Button className="mt-[50px] w-[100px]">Save</Button>
      </main>
    </Layout>
  );
}
