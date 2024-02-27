import { Label } from "../../ui/label";
import Input from "../../ui/Input";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { type InvoiceSchema } from "./newInvoiceForm";

interface Props {
  idx: number;
  keyIdentifier: string;
  register: UseFormRegister<InvoiceSchema>;
  watch: UseFormWatch<InvoiceSchema>;
}

export default function InvoiceItemForm({
  idx,
  register,
  watch,
  keyIdentifier,
}: Props) {
  return (
    <section className="flex items-center space-x-10 pt-5" key={keyIdentifier}>
      <div>
        <Label>Item Name</Label>
        <Input
          placeholder="Travel Booking"
          className="mt-4"
          {...register(`invoiceItems.${idx}.itemName` as const)}
        />
      </div>

      <div>
        <Label>Qty</Label>
        <Input
          placeholder="1"
          className="mt-4"
          {...register(`invoiceItems.${idx}.quantity`, {
            valueAsNumber: true,
            min: 0,
          })}
          type="number"
        />
      </div>
      <div>
        <Label>Rate</Label>
        <Input
          placeholder="2500"
          className="mt-4"
          {...register(`invoiceItems.${idx}.rate`, {
            valueAsNumber: true,
            min: 0,
          })}
          type="number"
        />
      </div>
      <div>
        <Label>Amount</Label>
        <Input
          className="mt-4"
          {...register(`invoiceItems.${idx}.amount`, {
            valueAsNumber: true,
            min: 0,
          })}
          type="number"
          value={
            watch(`invoiceItems.${idx}.quantity`, 1) *
            watch(`invoiceItems.${idx}.rate`, 1)
          }
        />
      </div>
    </section>
  );
}
