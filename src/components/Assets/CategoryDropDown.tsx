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

const categories = [
  {
    value: "furnitures",
    label: "Furnitures",
  },
  {
    value: "machinery",
    label: "Machinery",
  },
  {
    value: "inventory",
    label: "Inventory",
  },
  {
    value: "office_equipment",
    label: "Office Equipment",
  },
  {
    value: "supplies",
    label: "Supplies",
  },

  {
    value: "other",
    label: "Other",
  },
];

export default function CategoryDropDown() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="z-[999] w-full bg-white">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between p-0 text-sm px-2 text-gray-500"
          >
            {value
              ? categories.find((category) => category.value === value)?.label
              : "Select category..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search category.." className="h-9" />
            <CommandEmpty>No category Found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {category.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
