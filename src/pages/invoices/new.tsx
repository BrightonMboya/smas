import Layout from "~/components/Layout/Layout";
import { Header, NoAsset } from "~/components/Assets";
import { ReactElement } from "react";
import { api } from "~/utils/api";
import NewInvoiceForm from "~/components/invoices/newForm/newInvoiceForm";
import { Toaster } from "~/components/ui/toaster";

function Page() {
  return (
    <main className="pl-5">
      <Toaster />
      <NewInvoiceForm />
    </main>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
