import { Control, useWatch } from "react-hook-form";
import { InvoiceSchema } from "./newInvoiceForm";



const Total = ({ control }: { control: Control<InvoiceSchema> }) => {
  const formValues = useWatch({
    control,
    name: "invoiceItems",
  });
  const total = formValues.reduce(
    (total, item, idx) => total + (item.quantity || 0) * (item.rate || 0),
    0,
  );
  return <p>Total Amount: {total}</p>;
};


export default Total;