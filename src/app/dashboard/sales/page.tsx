"use client";
import { NoAsset } from "~/components/Assets";
import { api } from "~/utils/api";
import SalesList from "~/components/accounting/SalesList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";
import Button from "~/components/ui/Button";

export default function Page() {
  const { isLoading, data } = api.sales.allSales.useQuery();

  return (
    <main className="pl-5">
      <Toaster />
      <div className="flex w-[90vw] items-center justify-between  pt-[40px] md:w-[1000px]">
        <h3 className="text-2xl font-medium md:text-3xl ">Your Company </h3>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/sales/new">
            <Button>Make a Sale</Button>
          </Link>
        </div>
      </div>
      {data?.length === 0 && (
        <NoAsset
          bigTitle="Looks like you haven't added any sales yet"
          smallTitle="When you make sales, they will appear here"
          c2a="Make a Sale"
          c2aUrl="/dashboard/sales/new"
        />
      )}
      {data === null && (
        <h3>
          Your Organization is not registered, contact our team to be registered
        </h3>
      )}
      {data?.length !== 0 && !isLoading && data !== null && (
        <SalesList sales={data} />
      )}
      {isLoading && <LoadingSkeleton />}
    </main>
  );
}
