import Link from "next/link";
import NoAsset from "~/components/Assets/NoAsset";
import Layout from "~/components/Layout/Layout";
import DebtList from "~/components/accounting/DebtsList";
import Button from "~/components/ui/Button";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { api } from "~/utils/api";
import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  const { isLoading, data } = api.debts.all.useQuery();

  return (
    <Layout>
      <Toaster />
      <main className="pl-5">
        <div className="flex w-[1000px] items-center justify-between pt-[40px] ">
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
            c2aUrl="/debts/new"
          />
        )}
        {isLoading && <LoadingSkeleton />}
        {/* @ts-expect-error */}
        {data?.length !== 0 && !isLoading && <DebtList debts={data} />}
      </main>
    </Layout>
  );
}
