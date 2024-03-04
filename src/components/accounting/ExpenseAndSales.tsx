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

export default function ExpenseAndSales() {
  return (
    <Tabs defaultValue="expenses" className="max-w-2xl space-y-4">
      <TabsList>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="sales">Sales</TabsTrigger>
      </TabsList>

      <TabsContent value="expenses">
        <Card>
          <CardHeader>
            <CardTitle>Record Expenses</CardTitle>
            <CardDescription>Input your expenses details here</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <Label htmlFor="expenseName">Expense Name</Label>
              <Input id="expenseName" placeholder="Expense Name" />
              <Label htmlFor="expenseDate">Date</Label>
              <Input id="expenseDate" placeholder="Date" type="date" />
              <Label htmlFor="expenseAmount">Amount</Label>
              <Input id="expenseAmount" placeholder="Amount" type="number" />
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Made a huge profit here ..."
              />
              <Button className="w-full" type="submit">
                Submit Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sales">
        <Card>
          <CardHeader>
            <CardTitle>Record Sales</CardTitle>
            <CardDescription>Input your sales details here</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <Label htmlFor="saleName">Customer Name</Label>
              <Input id="saleName" placeholder="Sale Name" />
              <Label htmlFor="saleName">Product Name</Label>
              <Input id="saleName" placeholder="10 cement bags" />
              <Label htmlFor="saleDate">Date</Label>
              <Input id="saleDate" placeholder="Date" type="date" />

              <Label htmlFor="saleAmount">Selling Price</Label>
              <Input id="saleAmount" placeholder="450,000" type="number" />

              <Label htmlFor="saleAmount">Quantity</Label>
              <Input id="saleAmount" placeholder="10" type="number" />

              <Label htmlFor="description">Status</Label>
              <Input id="description" placeholder="Cash " />
              <Button className="w-full" type="submit">
                Submit Sale
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
