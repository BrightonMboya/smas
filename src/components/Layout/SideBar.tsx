import Link from "next/link";
import {
  CubeIcon,
  PersonIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
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
  PlusCircle,
  Luggage,
  Send,
  Plane,
  Home,
  Receipt,
  BadgePercent,
  LogOutIcon,
} from "lucide-react";

export default function SideBar() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section className="bg-lightest fixed min-h-screen">
      <div className="spac flex w-full flex-col items-center justify-center px-5 pt-5 ">
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
            className={`flex items-center justify-center space-x-2
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

        <Link href="/contacts" className="mt-5">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/contacts")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <PersonIcon width={20} height={20} />

            <h3>Contacts</h3>
          </div>
        </Link>

        <Link href="/products" className="mt-5">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/products")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <Send width={20} height={20} />

            <h3>Products</h3>
          </div>
        </Link>

        <Button
          className="fixed bottom-10 ml-10 w-[150px] space-x-2"
          variant="destructive"
          onClick={() => signOut(() => router.push("/auth/login"))}
        >
          <LogOutIcon />
          <span>Log out</span>
        </Button>
      </div>
    </section>
  );
}
