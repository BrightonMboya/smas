import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/contacts/Header";

export default function Page() {
  return (
    <Layout>
      <main className="pl-5">
        <Header title="Products" />
        <NoAsset
          bigTitle="You haven't added any products"
          smallTitle="It's easier to manage. Go ahead and add new products to manage now"
          c2a="Add Products"
          c2aUrl="/products/new"
        />
      </main>
    </Layout>
  );
}
