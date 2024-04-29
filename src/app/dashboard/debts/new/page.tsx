import Button from "~/components/ui/Button";
import Layout from "~/components/Layout/Layout";

import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";

import { createClient } from "~/utils/supabase/server";
import AddDebtForm from "../_components/AddDebtForm";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default async function Page() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const organizations_id = user?.data?.user?.id as string;

  return (
    <Layout>
      <Toaster />
      <main className="mt-[40px] pl-[30px]">
        <div className="flex items-center space-x-10 pt-[30px] md:w-[1000px] md:justify-between  ">
          <h3 className="text-3xl font-medium ">New Debt </h3>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/debts/">
              <Button>View all Debts!</Button>
            </Link>
          </div>
        </div>
        <AddDebtForm organizations_id={organizations_id} />
      </main>
    </Layout>
  );
}
