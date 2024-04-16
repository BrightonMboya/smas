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
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();
  const organizationEmail = user?.primaryEmailAddress?.emailAddress;
  const { data, isLoading } = api.dashboard.overview.useQuery({
    organizationEmail: organizationEmail as unknown as string,
  });
  return (
    <Layout>
      <Toaster />

      <div className="md:w-[1200px]">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            {/* <div className="flex items-center space-x-2 ">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div> */}
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="expenseandsales">
                Expense and Sales
              </TabsTrigger>
              {/* <TabsTrigger value="reports">Reports</TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Sales
                    </CardTitle>
                    <p>Rwf</p>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <div className="text-2xl font-bold">{`Rwf ${data?.totalSales._sum.amount || 0}`}</div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Expenses
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <Banknote height={20} width={20} />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <div className="text-2xl font-bold">{`Rwf ${data?.totalExpenses._sum.amount || 0}`}</div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Debts
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <div className="text-2xl font-bold">
                        {`Rwf ${data?.totalDebts._sum.amount || 0}`}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    {/* <CardDescription>
                      You made 265 sales this month.
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="expenseandsales" className="space-y-4">
              <ExpenseAndSales />
            </TabsContent>
            {/* <TabsContent value="reports" className="space-y-4">
              <Reports />
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
