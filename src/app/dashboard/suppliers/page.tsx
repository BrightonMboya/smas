"use client";
import { NoAsset } from "~/components/Assets";
import SupplierList from "~/components/suppliers/SupplierList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { api } from "~/utils/api";
import Button from "~/components/ui/Button";
import Link from "next/link";

export default function Page() {
  const { isLoading, data, isError } = api.supplier.all.useQuery();

  return (
    <main className="pl-[70px] md:max-w-[90%]">
      {isError && <h3>We have an error</h3>}
      <div className="flex items-center justify-between pt-[40px]  ">
        <h3 className="text-3xl font-medium ">All Suppliers</h3>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/suppliers/">
            {/* <Button variant="ghost">View Suppliers</Button> */}
          </Link>
          <Link href="/dashboard/suppliers/new">
            <Button>+ New Supplier</Button>
          </Link>
        </div>
      </div>
      {data?.length === 0 && data !== undefined && (
        <NoAsset
          bigTitle="You haven't added your suppliers yet"
          smallTitle="It's easier to manage, and suppliers your supplier. Go ahead and them now"
          c2a="Add Suppliers"
          c2aUrl="/dashboard/suppliers/new"
        />
      )}
      {data === null && (
        <h3>
          Your Organization is not registered, contact our team to be registered
        </h3>
      )}

      {data?.length !== 0 && data !== null && !isLoading && (
        <SupplierList suppliers={data} />
      )}
      {isLoading && <LoadingSkeleton />}
    </main>
  );
}
