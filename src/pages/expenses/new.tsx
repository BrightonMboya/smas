import Expenses from "~/components/accounting/Expenses";
import Layout from "~/components/Layout/Layout";

export default function Page() {
  return (
    <Layout>
      <main className="ml-10 mt-10 w-[600px]">
        <Expenses />
      </main>
    </Layout>
  );
}
