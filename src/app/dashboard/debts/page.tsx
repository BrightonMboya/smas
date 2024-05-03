"use client";
import Link from "next/link";
import NoAsset from "~/components/Assets/NoAsset";
import DebtList from "~/components/accounting/DebtsList";
import Button from "~/components/ui/Button";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { api } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  const { data, isLoading } = api.debts.getAllDebts.useQuery();

  return (
    <>
      <Toaster />
      <main className="pl-5">
        <div className="flex items-center justify-between pt-[40px] md:w-[1000px] ">
          <h3 className="text-3xl font-medium ">Your Debts</h3>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/debts/new">
              <Button>New Debt</Button>
            </Link>
          </div>
        </div>
        {data?.length === 0 && (
          <NoAsset
            bigTitle="Looks like you don't have any debts"
            smallTitle="Keep on rocking"
            c2a="Add Debts"
            c2aUrl="/dashboard/debts/new"
          />
        )}
        {isLoading && <LoadingSkeleton />}
        {data === null && (
          <h3>
            Your Organization is not registered, contact our team to be
            registered
          </h3>
        )}
        {data?.length !== 0 && data !== null && !isLoading && (
          // @ts-ignore
          <DebtList debts={data} />
        )}
      </main>
    </>
  );
}
