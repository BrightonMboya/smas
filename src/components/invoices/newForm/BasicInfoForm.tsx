import { AssetLabel, ItemLayout } from "~/components/Assets/NoAsset";
import Input from "~/components/ui/Input";
import { UseFormRegister } from "react-hook-form";
import { type InvoiceSchema } from "./schema";

interface Props {
  register: UseFormRegister<InvoiceSchema>;
}

export default function InvoiceDetalsForm({ register }: Props) {
  return (
    <form>
      <div className="md:w-[500px] space-y-5">
        <ItemLayout>
          <AssetLabel label="Invoice Number" />
          <Input {...register("invoiceName")} />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel label="Invoice Date" />
          <Input
            {...register("invoiceDate", { valueAsDate: true })}
            type="date"
          />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel label="Due Date" />
          <Input
            {...register("invoiceDueDate", { valueAsDate: true })}
            type="date"
          />
        </ItemLayout>
      </div>

      <section className="flex flex-col pt-[60px] md:flex-row md:space-x-10">
        <div className="bg-slate-100/90 p-3">
          <h3>
            From{" "}
            <span className="text-sm italic text-gray-500">(Your Details)</span>
          </h3>
          <div className="mt-5 space-y-5 rounded-md border-[1px] bg-white p-5  ">
            <Input
              placeholder="Your Business Name"
              className="w-[300px]"
              {...register("companyName")}
            />
            <Input
              placeholder="Address"
              className="w-[300px]"
              {...register("companyAdress")}
            />
          </div>
        </div>

        <div className="mt-10 bg-slate-100/90 p-3 md:mt-0">
          <h3>
            For{" "}
            <span className="text-sm italic text-gray-500">
              (Your Client Details)
            </span>
          </h3>
          <div className="mt-5 space-y-5 rounded-md border-[1px] bg-white p-5  ">
            <Input
              placeholder="Client's Business Name"
              className="w-[300px]"
              {...register("clientName")}
            />
            <Input
              placeholder="Client's Address"
              className="w-[300px]"
              {...register("clientAdress")}
            />
          </div>
        </div>
      </section>
    </form>
  );
}
