import Layout from "~/components/Layout/Layout";
import { api } from "~/utils/api";
import NewInvoiceForm from "~/components/invoices/newForm/newInvoiceForm";
import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  return (
    <Layout>
    <main className="pl-5">
      <Toaster />
      <NewInvoiceForm />
    </main>
    </Layout>
  );
}

