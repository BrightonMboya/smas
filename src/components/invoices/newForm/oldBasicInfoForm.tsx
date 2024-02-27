import { ItemLayout, AssetLabel } from "~/components/Assets/NoAsset";
import Input from "../../ui/Input";
import { UseFormRegister } from "react-hook-form";
import { type InvoiceSchema } from "../newForm/newInvoiceForm";

interface Props {
  register: UseFormRegister<InvoiceSchema>;
}

export default function BasicInfoForm({ register }: Props) {
  return (
    <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
      <ItemLayout>
        <AssetLabel
          label="Name"
          caption="Give this Invoice a descriptive Name"
        />
        <Input
          placeholder="2 Day Kilimanjaro Trip"
          {...register("invoiceName")}
        />
      </ItemLayout>

      <ItemLayout>
        <AssetLabel label="Date" caption="When was this Invoice created" />
        <Input type="date" {...register("date", { valueAsDate: true })} />
      </ItemLayout>
      <ItemLayout>
        <AssetLabel label="Company Name" />
        <Input placeholder="Ashesi Travel" {...register("companyName")} />
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="TIN"
          caption="Enter the TIN Number of your company"
        />
        <Input
          placeholder="29091238701237123"
          {...register("tinNumber")}
         
        />
      </ItemLayout>
      <ItemLayout>
        <AssetLabel label="Address" caption="Your company Adress" />
        <Input placeholder="Arusha, Tanzania" {...register("companyAdress")} />
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Billing Address"
          caption="Enter the address of the billing adress"
        />
        <Input placeholder="Munich, Germany" {...register("billingAdress")} />
      </ItemLayout>
      <ItemLayout>
        <AssetLabel
          label="Name"
          caption="Enter the name of the person getting billed"
        />
        <Input placeholder="Kai Bradley" {...register("clientName")} />
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Bank Name"
          caption="Which bank will the money deposited?"
        />

        <Input placeholder="Azania Bank" {...register("bankName")} />
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Account Name"
          caption="What is the name of this account"
        />
        <Input placeholder="James Brady" {...register("bankCustomerName")} />
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Account Number"
          caption="Enter the account number for this bank"
        />
        <Input
          placeholder="122009123213"
          {...register("accNo")}
        
        />
      </ItemLayout>
    </section>
  );
}
