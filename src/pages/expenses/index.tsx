import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import { api } from "~/utils/api";
import ExpenseList from "~/components/accounting/ExpenseList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";
import Button from "~/components/ui/Button";

export default function Page() {
  const { isLoading, data } = api.accounting.allExpenses.useQuery();

  return (
    <Layout>
      <main className="pl-5">
        <Toaster />
        <div className="flex w-[1000px] items-center justify-between pt-[40px] ">
          <h3 className="text-3xl font-medium ">Your Expenses</h3>
          <div className="flex items-center gap-2">
            <Link href="/expenses/new">
              <Button>New Expense</Button>
            </Link>
          </div>
        </div>
        {data?.length === 0 && (
          <NoAsset
            bigTitle="You haven't added any products"
            smallTitle="It's easier to manage. Go ahead and add new products to manage now"
            c2a="Add Products"
            c2aUrl="/products/new"
          />
        )}
        {data?.length !== 0 && !isLoading && <ExpenseList expenses={data} />}
        {isLoading && <LoadingSkeleton />}
      </main>
    </Layout>
  );
}
