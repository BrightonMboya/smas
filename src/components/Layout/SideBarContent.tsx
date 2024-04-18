"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Receipt,
  BadgePercent,
  LogOutIcon,
  Activity,
  Banknote,
  Container,
  PiggyBank,
  MoveLeft,
} from "lucide-react";

import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter, usePathname } from "next/navigation";
import Button from "../ui/Button";
import { SetStateAction, type Dispatch } from "react";
import { createClient } from "~/utils/supabase/client";

interface Props {
  setShowNav: Dispatch<SetStateAction<boolean>>;
  showNav: boolean;
}

export default function SideBarContent({ showNav, setShowNav }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  return (
    <section className="fixed z-[1000]  min-h-screen w-screen bg-lightest md:block md:w-[220px]">
      <div className="flex w-full flex-col  justify-start px-5 pt-5 ">
        <button
          type="button"
          onClick={() => {
            setShowNav(!showNav);
          }}
          className="md:hidden"
        >
          <MoveLeft size={30} color="#46783E" className="lg:hidden" />
        </button>

        <Accordion type="single" collapsible className="text-gray-500">
          <AccordionItem value="itienaries">
            <AccordionTrigger>Invoice Management</AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-5">
              <Link href="/invoices">
                <div
                  className={`flex items-center justify-center space-x-2
              ${pathname === "/invoices" ? "text-dark" : "text-gray-500"}
          `}
                >
                  <Receipt width={20} height={20} />
                  <h3>Invoices</h3>
                </div>
              </Link>

              <Link href="/invoices/new">
                <div
                  className={`flex items-center justify-center space-x-2
              ${pathname === "/invoices/new" ? "text-dark" : "text-gray-500"}
          `}
                >
                  <BadgePercent width={20} height={20} />
                  <h3>New Invoice</h3>
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Link href="/accounting">
          <div
            className={`flex space-x-2
              ${
                pathname?.includes("/accounting")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <span>$</span>

            <h3>Accounting</h3>
          </div>
        </Link>

        <Link href="/suppliers" className="mt-5">
          <div
            className={`flex space-x-2
              ${
                pathname?.includes("/suppliers") ? "text-dark" : "text-gray-500"
              }
          `}
          >
            <PersonIcon width={20} height={20} />

            <h3>Suppliers</h3>
          </div>
        </Link>

        <Link href="/products" className="mt-5">
          <div
            className={`flex space-x-2
              ${pathname?.includes("/products") ? "text-dark" : "text-gray-500"}
          `}
          >
            <Container width={20} height={20} />

            <h3>Products</h3>
          </div>
        </Link>

        <Link href="/sales" className="mt-5">
          <div
            className={`flex space-x-2
              ${pathname?.includes("/sales") ? "text-dark" : "text-gray-500"}
          `}
          >
            <Activity width={20} height={20} />
            <h3>Sales</h3>
          </div>
        </Link>

        <Link href="/expenses" className="mt-5">
          <div
            className={`flex space-x-2
              ${pathname?.includes("/expenses") ? "text-dark" : "text-gray-500"}
          `}
          >
            <Banknote width={20} height={20} />
            <h3>Expenses</h3>
          </div>
        </Link>

        <Link href="/debts" className="mt-5">
          <div
            className={`flex space-x-2
              ${pathname?.includes("/debts") ? "text-dark" : "text-gray-500"}
          `}
          >
            <PiggyBank width={20} height={20} />
            <h3>Debts</h3>
          </div>
        </Link>

        <Button
          className="fixed bottom-10  w-[150px] space-x-2"
          variant="destructive"
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          <LogOutIcon />
          <span>Log out</span>
        </Button>
      </div>
    </section>
  );
}
