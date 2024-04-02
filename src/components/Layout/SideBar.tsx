import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Button from "../ui/Button";
import { UserButton, useClerk } from "@clerk/nextjs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Send,
  Receipt,
  BadgePercent,
  LogOutIcon,
  Activity,
  Banknote,
  Container,
  PiggyBank,
} from "lucide-react";

export default function SideBar() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section className="fixed hidden min-h-screen bg-lightest md:block">
      <div className="spac flex w-full flex-col  justify-start px-5 pt-5 ">
        <UserButton
          appearance={{
            variables: {},
          }}
        />

        <Accordion type="single" collapsible className="text-gray-500">
          <AccordionItem value="itienaries">
            <AccordionTrigger>Invoice Management</AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-5">
              <Link href="/invoices">
                <div
                  className={`flex items-center justify-center space-x-2
              ${router.pathname === "/invoices" ? "text-dark" : "text-gray-500"}
          `}
                >
                  <Receipt width={20} height={20} />
                  <h3>Invoices</h3>
                </div>
              </Link>

              <Link href="/invoices/new">
                <div
                  className={`flex items-center justify-center space-x-2
              ${
                router.pathname === "/invoices/new"
                  ? "text-dark"
                  : "text-gray-500"
              }
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
                router.pathname.startsWith("/accounting")
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
                router.pathname.startsWith("/suppliers")
                  ? "text-dark"
                  : "text-gray-500"
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
              ${
                router.pathname.startsWith("/products")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <Container width={20} height={20} />

            <h3>Products</h3>
          </div>
        </Link>

        <Link href="/sales" className="mt-5">
          <div
            className={`flex space-x-2
              ${
                router.pathname.startsWith("/sales")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <Activity width={20} height={20} />
            <h3>Sales</h3>
          </div>
        </Link>

        <Link href="/expenses" className="mt-5">
          <div
            className={`flex space-x-2
              ${
                router.pathname.startsWith("/expenses")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <Banknote width={20} height={20} />
            <h3>Expenses</h3>
          </div>
        </Link>

        <Link href="/debts" className="mt-5">
          <div
            className={`flex space-x-2
              ${
                router.pathname.startsWith("/debts")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <PiggyBank width={20} height={20} />
            <h3>Debts</h3>
          </div>
        </Link>

        <Button
          className="fixed bottom-10  w-[150px] space-x-2"
          variant="destructive"
          onClick={() => signOut(() => router.push("/auth/sign-in"))}
        >
          <LogOutIcon />
          <span>Log out</span>
        </Button>
      </div>
    </section>
  );
}
