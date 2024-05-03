import NewInvoiceForm from "~/components/invoices/newForm/newInvoiceForm";
import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  return (
    <main className="pl-5 py-10">
      <Toaster />
      <NewInvoiceForm />
    </main>
  );
}
