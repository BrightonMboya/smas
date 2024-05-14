"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SetStateAction, type Dispatch } from "react";
import { useFormStatus } from "react-dom";
import {
  PackageIcon,
  CoinsIcon,
  CreditCardIcon,
  LineChartIcon,
  ReceiptIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from "./icons";
import { Separator } from "../ui/seperator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Truck } from "lucide-react";

interface Props {
  setShowNav: Dispatch<SetStateAction<boolean>>;
  showNav: boolean;
}

export default function SideBarContent({ showNav, setShowNav }: Props) {
  const pathname = usePathname();
  const { pending, action } = useFormStatus();

  const baseLinkClass =
    "flex items-center gap-8 rounded-md px-3 py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900  ";
  const activeLinkClass = "text-white bg-indigo-500";
  const baseClass = ` hover:text-primary space-x-5`;
  const activeClass = `text-primary font-medium`;

  return (
    <section className="fixed z-[1000]  min-h-screen ">
      <div className="flex h-screen max-h-screen w-[250px] flex-col gap-4 border-r-[1px] border-r-gray-300 bg-white p-4 ">
        <div className="flex items-center gap-2 font-semibold text-gray-900 ">
          <span>SMAS</span>
        </div>
        <Separator className="" />
        <nav className="flex flex-col gap-[15px]">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={`${baseLinkClass} ${pathname.startsWith("/dashboard/products") && activeLinkClass} text-base `}
              >
                <span>
                  <PackageIcon className="h-4 w-4" />
                </span>
                Products
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Link
                  href="/dashboard/products/new"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/products/new" && activeClass} `}
                >
                  <p>
                    <span className="pr-3">{` > `}</span>
                    New Product
                  </p>
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/products/stockTacking/new"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/products/stockTacking/new" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  Stock Taking
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/products/categories/new"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/products/categories/new" && activeClass}  `}
                >
                  {" "}
                  <span className="pr-3">{` > `}</span>
                  New Category
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/products"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/products" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  List Products
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/products/categories"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/products/categories" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  List Categories
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/products/adjustments"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/products/adjustments" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  List Adjustments
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={`${baseLinkClass} ${pathname === "/dashboard/sales" && activeLinkClass} text-base `}
              >
                <span>
                  <LineChartIcon className="h-4 w-4" />
                </span>
                Sales
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Link href="/dashboard/sales/new" prefetch>
                  New Sale
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link href="/dashboard/sales/orders/new" prefetch>
                  New Order
                </Link>
              </AccordionContent>

              <AccordionContent>
                <Link href="/dashboard/sales">List Sales</Link>
              </AccordionContent>

              <AccordionContent>
                <Link href="/dashboard/sales/orders">List Orders</Link>
              </AccordionContent>

              <AccordionContent>
                <Link href="/dashboard/sales/invoices/new">
                  New Perfoma Invoice
                </Link>
              </AccordionContent>

              <AccordionContent>
                <Link href="/dashboard/sales/invoices" prefetch>
                  List Perfoma Invoices
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={`${baseLinkClass} ${pathname.startsWith("/dashboard/expenses") && activeLinkClass} text-base `}
              >
                <span>
                  <WalletIcon className="h-4 w-4" />
                </span>
                Expenses
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Link
                  href="/dashboard/expenses/new"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/expenses/new" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  New Expense
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/expenses"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/expenses" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  List Expenses
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/expenses/expenseType/new"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/expenses/expenseType/new" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  New Expense Type
                </Link>
              </AccordionContent>

              <AccordionContent>
                <Link
                  href="/dashboard/expenses/expenseType"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/expenses/expenseType" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  List Expense Types
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={`${baseLinkClass} ${pathname.startsWith("/dashboard/purchases") && activeLinkClass} text-base `}
              >
                <span>
                  <Truck className="h-4 w-4" />
                </span>
                Purchases
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Link
                  href="/dashboard/purchases/new"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/purchases/new" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  New Purchase
                </Link>
              </AccordionContent>
              <AccordionContent className="">
                <Link
                  href="/dashboard/suppliers/new"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/purchases/suppliers/new" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  New Supplier
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/purchases"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/purchases" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  Bulk Purchase
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  href="/dashboard/purchases"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/purchases" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  List Purchases
                </Link>
              </AccordionContent>

              <AccordionContent>
                <Link
                  href="/dashboard/suppliers"
                  prefetch
                  className={`${baseClass} ${pathname === "/dashboard/suppliers" && activeClass} `}
                >
                  <span className="pr-3">{` > `}</span>
                  List Suppliers
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* <Link
            className={`${baseLinkClass} ${pathname.startsWith("/dashboard/sales") && activeLinkClass} `}
            href="/dashboard/sales"
          >
            <LineChartIcon className="h-4 w-4" />
            Sales
          </Link>
          <Link
            className={`${baseLinkClass} ${pathname.startsWith("/dashboard/expenses") && activeLinkClass} `}
            href="/dashboard/expenses"
          >
            <WalletIcon className="h-4 w-4" />
            Expenses
          </Link>
          <Link
            className={`${baseLinkClass} ${pathname.startsWith("/dashboard/suppliers") && activeLinkClass} `}
            href="/dashboard/suppliers"
          >
            <UsersIcon className="h-4 w-4" />
            Suppliers
          </Link>
          <Link
            className={`${baseLinkClass} ${pathname.startsWith("/dashboard/debts") && activeLinkClass} `}
            href="/dashboard/debts"
          >
            <CoinsIcon className="h-4 w-4" />
            Debts
          </Link>
          <Link
            className={`${baseLinkClass} ${pathname.startsWith("/dashboard/invoices") && activeLinkClass} `}
            href="/dashboard/invoices"
          >
            <ReceiptIcon className="h-4 w-4" />
            Invoices
          </Link>
          <Link
            className={`${baseLinkClass} ${pathname.startsWith("/dashboard/settings") && activeLinkClass} `}
            href="/dashboard/settings"
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Link>
          <Link
            className={`${baseLinkClass} ${pathname.startsWith("/dashboard/billing") && activeLinkClass} `}
            href="/dashboard/billing"
          >
            <CreditCardIcon className="h-4 w-4" />
            Billing
          </Link> */}
        </nav>
      </div>
    </section>
  );
}
