import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/suppliers/Header";
import SupplierList from "~/components/suppliers/SupplierList";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { api } from "~/utils/api";

export default function Page() {
  const { isLoading, data } = api.supplier.all.useQuery();

  return (
    <Layout>
      <main className="pl-5">
        <Header title="Suppliers" />
        {data?.length === 0 && (
          <NoAsset
            bigTitle="You haven't added your suppliers yet"
            smallTitle="It's easier to manage, and suppliers your supplier. Go ahead and them now"
            c2a="Add Suppliers"
            c2aUrl="/suppliers/new"
          />
        )}

        {data?.length !== 0 && !isLoading && <SupplierList suppliers={data} />}
        {isLoading && <LoadingSkeleton />}
      </main>
    </Layout>
  );
}
