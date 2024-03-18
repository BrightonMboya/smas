import { useToast } from "~/utils/hooks/useToast";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Checkbox } from "~/components/ui/checkbox";
import { type InvoiceSchema } from "../newForm/newInvoiceForm";
import { ColumnDef } from "@tanstack/react-table";
import Button from "~/components/ui/Button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";
import { Spinner } from "~/components/ui/LoadingSkeleton";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

type AdditionalTripType = {
  id: string;
  status: string;
};

type Invoices = InvoiceSchema & AdditionalTripType;

export const columns: ColumnDef<Invoices>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "invoiceName",
    header: "Invoice Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("invoiceName")}</div>
    ),
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clientName")}</div>
    ),
  },
  // {
  //   accessorKey: "Date",
  //   header: "Date",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{format(row.getValue("Date"), "PPP")}</div>
  //   ),
  // },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => <div>{row.getValue("totalAmount")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("status") ? (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Paid</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <span>Unpaid</span>
          </div>
        )}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const invoice = row.original;
      const { toast } = useToast();
      const router = useRouter();
      const user = useUser();
      const organizationEmail = user?.user?.primaryEmailAddress?.emailAddress;
      // const { mutateAsync, isLoading } = api.invoices.markAsPaid.useMutation({
      //   onSuccess: () => {
      //     toast({
      //       description: "Invoice Succesfully Marked as Paid",
      //     });
      //   },
      // });
      // const utils = api.useUtils();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white font-montserrat">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(invoice.id);
                toast({
                  description: "Invoice Link copied to clipboard",
                });
              }}
            >
              Copy Invoice ID
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              // onClick={() => {
              //   mutateAsync({ invoiceId: invoice.id });
              //   utils.invoices.byOrganization.invalidate({
              //     organizationEmail: organizationEmail,
              //   });
              // }}
            >
              {/* {isLoading ? <Spinner /> : " Mark as Paid"} */}
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push({
                  pathname: "/invoices/preview",
                  query: { invoiceId: invoice.id },
                });
              }}
            >
              View Invoice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
