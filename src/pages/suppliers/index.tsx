import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import SupplierList from "~/components/suppliers/SupplierList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { api } from "~/utils/api";
import Button from "~/components/ui/Button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const user = useUser();
  const { isLoading, data, isError } = api.supplier.all.useQuery({
    organizationEmail: user?.user?.primaryEmailAddress
      ?.emailAddress as unknown as string,
  });

  return (
    <Layout>
      <main className="pl-5">
        {isError && <h3>We have an error</h3>}
        <div className="flex w-[1000px] items-center justify-between pt-[40px] ">
          <h3 className="text-3xl font-medium ">Your Company </h3>
          <div className="flex items-center gap-2">
            <Link href="/suppliers/">
              {/* <Button variant="ghost">View Suppliers</Button> */}
            </Link>
            <Link href="/suppliers/new">
              <Button>New Supplier</Button>
            </Link>
          </div>
        </div>
        {data?.length === 0 && data !== undefined && (
          <NoAsset
            bigTitle="You haven't added your suppliers yet"
            smallTitle="It's easier to manage, and suppliers your supplier. Go ahead and them now"
            c2a="Add Suppliers"
            c2aUrl="/suppliers/new"
          />
        )}
        {data === null && (
          <h3>
            Your Organization is not registered, contact our team to be
            registered
          </h3>
        )}

        {data?.length !== 0 && data !== null && !isLoading && (
          <SupplierList suppliers={data} />
        )}
        {isLoading && <LoadingSkeleton />}
      </main>
    </Layout>
  );
}
