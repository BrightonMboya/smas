"use client";
import Button from "~/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";

import AddDebtForm from "./AddDebtForm";
import { useState } from "react";

export default function AddDebtButton() {
  const [dialopOpen, setDialopOpen] = useState(false);
  return (
    <Dialog onOpenChange={setDialopOpen} open={dialopOpen}>
      <DialogTrigger asChild>
        <Button>Add New Debt</Button>
      </DialogTrigger>
      <DialogContent className="w-[700px]">
        <DialogHeader>
          <DialogTitle>New Debt</DialogTitle>
          <DialogDescription>
            Its easier to keep track of your debts than you think.
          </DialogDescription>
        </DialogHeader>
        <AddDebtForm setDialogOpen={setDialopOpen} />
      </DialogContent>
    </Dialog>
  );
}
