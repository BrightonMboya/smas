import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function CreateBankForm() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="mt-3">Add Bank Details</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create New Bank Details</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-right">Bank Name</Label>
                <Input
                  id="name"
                  placeholder="Azania Bank"
                  className="col-span-3"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-right">Account Holder Name</Label>
                <Input
                  id="username"
                  placeholder="James John"
                  className="col-span-3"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-right">Account Number</Label>
                <Input
                  id="name"
                  placeholder="2000312890678991"
                  className="col-span-3"
                />
              </div>

              <div className="space-y-2">
                <Label  className="text-right">
                  Country
                </Label>
                <Input id="name" placeholder="Tanzania" className="col-span-3" />
              </div>

              <div className="space-y-2">
                <Label  className="text-right">
                  Currency
                </Label>
                <Input id="name" placeholder="Tsh" className="col-span-3" />
              </div>
            </div>
          </form>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
