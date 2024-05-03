"use client";
import { Header, NoAsset } from "~/components/Assets";
import { api } from "~/utils/api";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import InvoiceList from "~/components/invoices/invoiceTables/InvoiceList";
import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  const { data, isLoading } = api.invoices.all.useQuery();

  return (
    <main className="pl-5">
      <Header title="Your Invoices" href="/dashboard/invoices/new" />
      <Toaster />

      {data?.length === 0 && (
        <NoAsset
          bigTitle="You haven't added any invoices yet"
          smallTitle="Add Invoices for your guests and start tracking your finances"
          c2a="Add Invoices"
          c2aUrl="/dashboard/invoices/new"
        />
      )}
      {data?.length !== 0 && !isLoading && <InvoiceList invoices={data!} />}
      {isLoading && <LoadingSkeleton />}
    </main>
  );
}
