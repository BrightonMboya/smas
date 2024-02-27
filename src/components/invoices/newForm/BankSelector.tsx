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
import { useUser } from "@clerk/nextjs";
import CreateBankForm from "../bankForms/AddFormModal";

export default function BankSelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const user = useUser();
  const { data } = api.invoices.fetchOrganizationBanks.useQuery({
    organizationEmail: user?.user?.primaryEmailAddress
      ?.emailAddress as unknown as string,
  });

  return (
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
                (bank) => bank.bankName.toLowerCase() === value.toLowerCase(),
              )?.bankName
            : "Select Bank..."}

          <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Select Bank..." className="h-9" />
          <CommandEmpty>
            No Bank Details Added yet
          
          </CommandEmpty>
          <CommandGroup>
            {data?.map((bank) => (
              <CommandItem
                key={bank.id}
                value={bank.bankName}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {bank.bankName}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === bank.bankName ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}

            {data?.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <CreateBankForm />
              </div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
