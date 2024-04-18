"use client"

import Layout from "~/components/Layout/Layout";
import { Header, NoAsset } from "~/components/Assets";
import { ReactElement } from "react";
import { api } from "~/utils/api";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import InvoiceList from "~/components/invoices/invoiceTables/InvoiceList";
import { Toaster } from "~/components/ui/toaster";


function Page() {
  const { data, isLoading } = api.invoices.all.useQuery({
    organizationEmail: ""
  });

  return (
    <main className="pl-5">
      <Header title="Your Invoices" href="/invoices/new" />
      <Toaster />

      {data?.length === 0 && (
        <NoAsset
          bigTitle="You haven't added any invoices yet"
          smallTitle="Add Invoices for your guests and start tracking your finances"
          c2a="Add Invoices"
          c2aUrl="/invoices/new"
        />
      )}
      {data?.length !== 0 && !isLoading && <InvoiceList invoices={data!} />}
      {isLoading && <LoadingSkeleton />}
    </main>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
