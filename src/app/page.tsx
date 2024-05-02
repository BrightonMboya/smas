"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import { CalendarDateRangePicker } from "~/components/accounting/date-range-picker";
import { Overview } from "~/components/accounting/overview";
import { RecentSales } from "~/components/accounting/recent-sales";
import ExpenseAndSales from "~/components/accounting/ExpenseAndSales";
import Reports from "~/components/accounting/reports";
import Layout from "~/components/Layout/Layout";
import { api } from "~/utils/api";
import { Banknote } from "lucide-react";
import { Toaster } from "~/components/ui/toaster";
import { Spinner } from "~/components/ui/LoadingSkeleton";

export default function DashboardPage() {
  return (
    <Layout>
      <Toaster />
    </Layout>
  );
}
