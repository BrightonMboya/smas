import { NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/suppliers/Header";

export default function Page() {
  return (
    <Layout>
      <main className="pl-5">
        <Header title="Suppliers" />
        <NoAsset
          bigTitle="You haven't added your suppliers yet"
          smallTitle="It's easier to manage, and suppliers your supplier. Go ahead and them now"
          c2a="Add Suppliers"
          c2aUrl="/suppliers/new"
        />
      </main>
    </Layout>
  );
}
