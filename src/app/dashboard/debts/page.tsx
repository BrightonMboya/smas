import Link from "next/link";
import NoAsset from "~/components/Assets/NoAsset";
import Layout from "~/components/Layout/Layout";
import DebtList from "~/components/accounting/DebtsList";
import Button from "~/components/ui/Button";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
// import { api } from "~/utils/api";
import { api } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { createClient } from "~/utils/supabase/client";
import { fetchDebts } from "./_actions/debtsActions";

export default async function Page() {
  const { data, error } = await fetchDebts();

  return (
    <Layout>
      <Toaster />
      {!error && (
        <main className="pl-5">
          <div className="flex items-center justify-between pt-[40px] md:w-[1000px] ">
            <h3 className="text-3xl font-medium ">Your Debts</h3>
            <div className="flex items-center gap-2">
              <Link href="/debts/new">
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
          {/* {isLoading && <LoadingSkeleton />} */}
          {data === null && (
            <h3>
              Your Organization is not registered, contact our team to be
              registered
            </h3>
          )}
          {data?.length !== 0 && data !== null && (
            // @ts-ignore
            <DebtList debts={data} />
          )}
        </main>
      )}
      {error && <p>Sth went wrong</p>}
    </Layout>
  );
}
