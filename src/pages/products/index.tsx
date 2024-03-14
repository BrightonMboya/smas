import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/suppliers/Header";
import { api } from "~/utils/api";
import ProudctList from "~/components/products/ProductsList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { Toaster } from "~/components/ui/toaster";
import Link from "next/link";
import Button from "~/components/ui/Button";

export default function Page() {
  const { data, isLoading } = api.products.all.useQuery();
  return (
    <Layout>
      <main className="pl-5">
        <Toaster />
        <div className="flex w-[1000px] items-center justify-between pt-[40px] ">
          <h3 className="text-3xl font-medium ">Your Company </h3>
          <div className="flex items-center gap-2">
            <Link href="/products">
              <Button variant="ghost">View Products</Button>
            </Link>
            <Link href="/products/new">
              <Button>New Products</Button>
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
        {data?.length !== 0 && !isLoading && <ProudctList products={data} />}
        {isLoading && <LoadingSkeleton />}
      </main>
    </Layout>
  );
}
