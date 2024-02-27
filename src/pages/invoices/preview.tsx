import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/Card";
import Button from "~/components/ui/Button";
import { Separator } from "~/components/ui/seperator";
import { TableCell, TableRow, TableBody, Table } from "~/components/ui/table";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { format } from "date-fns";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";

export default function Component() {
  const { query } = useRouter();
  const invoiceId = query.invoiceId;
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
                  <div>Due date: June 30, 2022</div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <p className="font-semibold">{data?.clientName}</p>
                  <p>{data?.billingAdress}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="font-semibold">Payment method</div>
                  <p>{data?.bankName}</p>
                  <p>{data?.bankCustomerName}</p>
                  <p>{data?.accNo}</p>
                  {/* <div>Visa ending in 4242</div> */}
                </div>
              </div>
              <Separator />
              <Table className="mt-10">
                <TableBody>
                  {data?.invoiceItems!.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.desc}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {`Invoice was created on ${format(data?.Date!, "PPP")} `}
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
