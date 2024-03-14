import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/suppliers/Header";
import { api } from "~/utils/api";
import ProudctList from "~/components/products/ProductsList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  const { data, isLoading } = api.products.all.useQuery();
  return (
    <Layout>
      <main className="pl-5">
        <Toaster />
        <Header title="Products" />
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
