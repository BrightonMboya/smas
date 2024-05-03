"use client";
import { NoAsset } from "~/components/Assets";
import { api } from "~/utils/api";
import ExpenseList from "~/components/accounting/ExpenseList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";
import Button from "~/components/ui/Button";
import AddExpenseButton from "./_components/AddExpenseButton";

export default function Page() {
  const { isLoading, data } = api.accounting.allExpenses.useQuery();
  return (
    <>
      <main className="pl-[70px] md:max-w-[90%]">
        <Toaster />
        <div className="flex items-center justify-between pt-[40px]">
          <h3 className="text-3xl font-medium ">Your Expenses</h3>
          <div className="flex items-center gap-2">
            <AddExpenseButton />
            {/* <Link href="/dashboard/expenses/new">
              <Button>New Expense</Button>
            </Link> */}
          </div>
        </div>
        {data?.length === 0 && (
          <NoAsset
            bigTitle="Looks like you dont have any expenses yet"
            smallTitle="When you make expenses they will appear here"
            c2a="Make an expense"
            c2aUrl="/dashboard/expenses/new"
          />
        )}
        {data === null && (
          <h3>
            Your Organization is not registered, contact our team to be
            registered
          </h3>
        )}
        {data?.length !== 0 && data !== null && !isLoading && (
          <ExpenseList expenses={data!} />
        )}
        {isLoading && <LoadingSkeleton />}
      </main>
    </>
  );
}
