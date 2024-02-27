import Layout from "~/components/Layout/Layout";
import { Header, NoAsset } from "~/components/Assets";
import { ReactElement } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import InvoiceList from "~/components/invoices/invoiceTables/InvoiceList";
import { Toaster } from "~/components/ui/toaster";
function Page() {
  const user = useUser();
  const { data, isLoading } = api.invoices.queryByOrganization.useQuery({
    organizationEmail: user.user?.primaryEmailAddress
      ?.emailAddress as unknown as string,
  });

  return (
    <main className="pl-5">
      <Header title="Your Invoices" href="/invoices/new" />
      <Toaster />
      {data?.length === 0 && (
        <NoAsset
          bigTitle="You haven't added any invoices yet"
          smallTitle="Add Invoices for your guests and start tracking your finances"
          c2a="Add Invoices"
          c2aUrl="/invoices/new"
        />
      )}
      {data?.length !== 0 && !isLoading && <InvoiceList invoices={data!} />}
      {isLoading && <LoadingSkeleton />}
    </main>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
