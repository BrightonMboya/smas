"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "~/utils/utils";
import Button from "~/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { api } from "~/utils/api";
import Link from "next/link";
import { Spinner } from "../ui/LoadingSkeleton";
import { ControllerRenderProps } from "react-hook-form";
import { SalesSchema } from "./Sales";

interface Props {
  field: ControllerRenderProps<SalesSchema, "productsId">;
}

export default function ProductSelector({ field }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [remaingProduct, setRemainingProducts] = React.useState(0);
  const [showRemainingProducts, setShowRemainingProducts] =
    React.useState(false);
  const { data, isLoading } = api.products.all.useQuery({
    organizationEmail: ""
  });

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" justify-between"
          >
            {value
              ? data?.find(
                  (product) =>
                    product.name.toLowerCase() === value.toLowerCase(),
                )?.name
              : "Select Product..."}

            <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput placeholder="Select Product..." className="h-9" />
            {isLoading && <Spinner />}
            <CommandEmpty>No Product Found</CommandEmpty>
            <CommandGroup>
              {data?.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.name}
                  className="cursor-pointer"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    field.onChange(product.id);
                    setShowRemainingProducts(true);
                    setRemainingProducts(product.stockAvailable)
                    setOpen(false);
                  }}
                >
                  {product.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === product.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}

              {data?.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <Link href="/products/new">
                    <Button>Add new Product</Button>
                  </Link>
                </div>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {showRemainingProducts && (
        <div>
          <p>{`Remaining Products: ${remaingProduct}`}</p>
        </div>
      )}
    </>
  );
}
