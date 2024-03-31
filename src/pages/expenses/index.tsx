import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import { api } from "~/utils/api";
import ExpenseList from "~/components/accounting/ExpenseList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";
import Button from "~/components/ui/Button";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();
  const { isLoading, data } = api.accounting.allExpenses.useQuery({
    organizationEmail: user?.primaryEmailAddress
      ?.emailAddress as unknown as string,
  });

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
            bigTitle="Looks like you dont have any expenses yet"
            smallTitle="When you make expenses they will appear here"
            c2a="Make an expense"
            c2aUrl="/expenses/new"
          />
        )}
        {data === null && (
          <h3>
            Your Organization is not registered, contact our team to be
            registered
          </h3>
        )}
        {data?.length !== 0 && data !== null && !isLoading && <ExpenseList expenses={data!} />}
        {isLoading && <LoadingSkeleton />}
      </main>
    </Layout>
  );
}
