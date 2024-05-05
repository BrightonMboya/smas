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

interface Props {
  setShowNav: Dispatch<SetStateAction<boolean>>;
  showNav: boolean;
}

export default function SideBarContent({ showNav, setShowNav }: Props) {
  const pathname = usePathname();
  const { pending, action } = useFormStatus();

  const baseLinkClass =
    "flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900  ";
  const activeLinkClass = "text-white bg-indigo-500";

  return (
    <section className="fixed z-[1000]  min-h-screen ">
      <div className="flex h-screen max-h-screen w-[200px] flex-col gap-4 border-r-[1px] border-r-gray-300 bg-white p-4 ">
        <div className="flex items-center gap-2 font-semibold text-gray-900 ">
          <span>SMAS</span>
        </div>
        <Separator className=""/>
        <nav className="flex flex-col gap-[15px]">
          <Link
            className={`${baseLinkClass} ${pathname.startsWith("/dashboard/products") && activeLinkClass} `}
            href="/dashboard/products"
          >
            <PackageIcon className="h-4 w-4" />
            Products
          </Link>
          <Link
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
          </Link>
        </nav>
      </div>
    </section>
  );
}
