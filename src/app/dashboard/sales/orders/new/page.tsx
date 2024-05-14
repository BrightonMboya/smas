// "use client";
import Sales from "~/app/dashboard/sales/_components/Sales";
export default function Page() {
  return (
    <main className="ml-5 flex  space-x-5 pt-10 md:ml-[70px] md:w-[600px]">
      <Sales />
      <section className="h-full w-[500px] rounded-md bg-white p-5 ">
        <p>Table Displaying the orders</p>
      </section>
    </main>
  );
}
