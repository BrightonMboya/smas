"use client"
import Sales from "~/components/accounting/Sales";
import Layout from "~/components/Layout/Layout";

export default function Page() {
  return (
    <Layout>
      <main className="ml-5 mt-10  md:ml-10 md:w-[600px]">
        <Sales />
      </main>
    </Layout>
  );
}
