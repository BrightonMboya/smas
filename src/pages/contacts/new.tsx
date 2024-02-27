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
        <h3 className="text-2xl font-medium ">New Guest</h3>
        <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
          <ItemLayout>
            <AssetLabel label="First Name" />
            <Input placeholder="John" />
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Last Name" />
            <Input placeholder="Doe" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Primary Email" />
            <Input placeholder="doe@gmail.com" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Phone Number" />
            <Input placeholder="+91 780348912" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Gender"
              caption="Gender of the guest as it appears in passport"
            />
            <GenderDropDown />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Passport Number"
              caption="Passport number as it appears in the passport"
            />
            <Input placeholder="TAT 448912" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Country of Issue"
              caption="Country where this passport got issued"
            />
            <Input placeholder="Kenya" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Date of Issue"
              caption="When was this passport issued"
            />
            <DatePicker />
          </ItemLayout>
          <ItemLayout>
            <AssetLabel
              label="Nationality"
              caption="Which nationality is this guest from"
            />
            <Input placeholder="Dannish" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Citizenship" />
            <Input placeholder="Denmark" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Notes"
              caption="Enter additional details about this guest"
            />

            <Textarea placeholder="Add short notes about this guest" />
          </ItemLayout>
        </section>
        <Button className="mt-[50px] w-[100px]">Save</Button>
      </main>
    </Layout>
  );
}
