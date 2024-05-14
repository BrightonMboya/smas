"use client";
import { NoAsset } from "~/components/Assets";
import { api } from "~/trpc/react";
import ProudctList from "~/app/dashboard/products/_components/ProductsList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  const { data, isLoading } = api.products.all.useQuery();
  return (
    <main className="pl-[70px] md:max-w-[90%] ">
      <Toaster />
      <div className="flex items-center justify-between pt-[40px] ">
        <h3 className="text-3xl font-medium ">All Product Categories</h3>
      </div>
      {data?.length === 0 && (
        <NoAsset
          bigTitle="You haven't added any product Categories"
          smallTitle="It's easier to manage. Go ahead and add new categories now"
          c2a="Add Product Category"
          c2aUrl="/dashboard/products/categories/new"
        />
      )}
      {data === null && (
        <h3>
          Your Organization is not registered, contact our team to be registered
        </h3>
      )}
      {data?.length !== 0 && data !== null && !isLoading && (
        <ProudctList products={data} />
      )}
      {isLoading && <LoadingSkeleton />}
    </main>
  );
}
