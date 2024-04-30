"use client"
import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/Card";
import Button from "~/components/ui/Button";
import { Separator } from "~/components/ui/seperator";
import {
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableHead,
} from "~/components/ui/table";
import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";
import { format } from "date-fns";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";

export default function Component() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams?.get("invoiceId");
  
  const { data, isLoading } = api.invoices.queryById.useQuery({
    invoiceId: invoiceId as unknown as string,
  });
  console.log(data);
  return (
    <>
      {data && !isLoading && (
        <section className="mt-5 flex items-center justify-center">
          <Card className="w-[70%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invoice</CardTitle>
              <Button size="sm">Download</Button>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <p className="font-semibold">{data?.invoiceName}</p>
                  <p>{data?.companyAdress}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="font-semibold">{`Invoice #${invoiceId}`}</div>
                  <div>{`Due date: ${format(data?.invoiceDueDate!, "PPP")}`}</div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <p className="font-semibold">{data?.clientName}</p>
                  <p>{data?.clientAdress}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {/* <div className="font-semibold">Payment method</div> */}

                  {/* <div>Visa ending in 4242</div> */}
                </div>
              </div>
              <Separator />
              <Table className="mt-10 w-[300px]">
                <TableBody>
                  {data?.invoiceItems!.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {`Invoice was created on ${format(data?.invoiceDate!, "PPP")} `}
                </p>
                <div className="flex flex-col gap-1 md:gap-0">
                  <p className="text-lg font-semibold md:text-xl">
                    {` Total amount: ${data?.totalAmount}`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Includes all taxes and fees
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {isLoading && <LoadingSkeleton />}
    </>
  );
}
