"use client";
import Button from "~/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/Dialog";
import Expenses from "~/components/accounting/Expenses";

import { useState } from "react";

export default function AddExpenseButton() {
  const [dialopOpen, setDialopOpen] = useState(false);
  return (
    <Dialog onOpenChange={setDialopOpen} open={dialopOpen}>
      <DialogTrigger asChild>
        <Button>New Expense</Button>
      </DialogTrigger>
      <DialogContent className="w-[700px]">
        <DialogHeader>
          {/* <DialogTitle>New Debt</DialogTitle>
          <DialogDescription>
            Its easier to keep track of your debts than you think.
          </DialogDescription> */}
          <Expenses setDialogOpen={setDialopOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
