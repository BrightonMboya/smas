// "use client";
import Sales from "~/app/dashboard/sales/_components/Sales";
export default function Page() {
  return (
    <main className="ml-5 pt-10  md:ml-[70px] md:w-[600px] flex space-x-5" >
      <Sales />
      <section className="bg-white rounded-md w-[500px] h-full p-5 ">
        <p>Customer Buying Items - 0</p>
      </section>
    </main>
  );
}
