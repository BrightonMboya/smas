"use client";
import { Header, NoAsset } from "~/components/Assets";
import { api } from "~/utils/api";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import InvoiceList from "~/components/invoices/invoiceTables/InvoiceList";
import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";
import Button from "~/components/ui/Button";

export default function Page() {
  const { data, isLoading } = api.invoices.all.useQuery();

  return (
    <main className="pl-[70px] md:max-w-[90%]">
      <div className="flex items-center justify-between  pt-[40px]">
        <h3 className="text-2xl font-medium md:text-3xl ">All Invoices </h3>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/invoices/new">
            <Button>New Invoice</Button>
          </Link>
        </div>
      </div>
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
