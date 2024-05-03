"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "~/components/ui/Card";
import { Label } from "~/components/ui/label";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import Expenses from "./Expenses";
import Sales from "../../app/dashboard/sales/_components/Sales";

export default function ExpenseAndSales() {
  return (
    <Tabs defaultValue="expenses" className="max-w-2xl space-y-4">
      <TabsList>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="sales">Sales</TabsTrigger>
      </TabsList>

      <TabsContent value="expenses">
        <Expenses />
      </TabsContent>
      <TabsContent value="sales">
        <Sales />
      </TabsContent>
    </Tabs>
  );
}
