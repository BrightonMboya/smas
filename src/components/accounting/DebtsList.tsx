"use client";

import * as React from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Button from "~/components/ui/Button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Input from "~/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/utils/api";
import { useToast } from "~/utils/hooks/useToast";
import { format } from "date-fns";

export type Debts = {
  id: string;
  debotrName: string;
  amount: number;
  paid: boolean;
  date: Date;
};

export const columns: ColumnDef<Debts>[] = [
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
    accessorKey: "debtorName",
    header: "Debtor Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("debtorName")}</div>
    ),
  },

  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("amount")}</div>
    ),
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize">{format(row.getValue("date"), "PPP")}</div>
    ),
  },
  {
    accessorKey: "paid",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("paid") ? (
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
      const debt = row.original;
      const utils = api.useUtils();

      const debtRouter = api.debts.markAsPaid.useMutation({
        onSuccess: () => {
          toast({
            description: "Debt marked as Paid",
          });
        },
        onSettled: () => {
          utils.debts.getAllDebts.invalidate();
        },
        onMutate: (debt) => {
          utils.debts.getAllDebts.cancel();
          const prevData = utils.debts.getAllDebts.getData();
          const updatedData = prevData?.map((expense) => {
            if (expense.id === debt.debtId) {
              // If the expense ID matches, create a new object with the expense marked as paid
              return {
                ...expense,
                paid: true, 
              };
            } else {
              // If the expense ID doesn't match, return the expense unchanged
              return expense;
            }
          });
          utils.debts.getAllDebts.setData(undefined, updatedData);
          return { prevData };
        },
        onError: (error, debt, ctx) => {
          utils.debts.getAllDebts.setData(undefined, ctx?.prevData);
          toast({
            variant: "destructive",
            description: `Failed to mark debt as paid: ${error.message}`,
          });
        },
      });
      const { mutateAsync, isLoading } = api.debts.deleteDebt.useMutation({
        onSuccess: () => {
          toast({
            description: "Debt Deleted Succesfully",
          });
        },
        onSettled: () => {
          utils.debts.getAllDebts.invalidate();
        },
        onMutate: (newDebt) => {
          utils.debts.getAllDebts.cancel();
          const prevData = utils.debts.getAllDebts.getData();

          const updatedDebts = prevData?.filter(
            (debt) => debt.id !== newDebt.debtId,
          );

          utils.debts.getAllDebts.setData(undefined, updatedDebts);
          return { prevData };
        },
        onError: (error, newDebt, ctx) => {
          utils.debts.getAllDebts.setData(undefined, ctx?.prevData);
          toast({
            variant: "destructive",
            description: `Failed to delete debt: ${error.message}`,
          });
        },
      });
      const { toast } = useToast();

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
                debtRouter.mutateAsync({
                  debtId: debt.id,
                });
              }}
            >
              Mark as Paid
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <Button
                variant="destructive"
                type="button"
                disabled={isLoading}
                onClick={() =>
                  mutateAsync({ debtId: debt.id as unknown as string })
                }
              >
                Delete Debt
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DebtList({ debts }: { debts: Debts[] | undefined }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: debts!,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Debts by names..."
          value={
            (table.getColumn("debtorName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("debtorName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white">
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
