import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "~/components/ui/Card";
import { Label } from "~/components/ui/label";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";

export default function ProfileSettings() {
  return (
    <div className="rounded-md border bg-white">
      <div className="rounded-t-md border-b bg-neutral-50 px-4 py-2 sm:px-6 md:py-3">
        <span className="mb-4 text-base font-medium sm:text-lg">
          Profile Information
        </span>
      </div>
      <div className="space-y-5 p-4 sm:px-6 lg:w-[60%]">
        <form>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
            <Button className="mt-5 w-[200px] ">Save</Button>
        </form>
      </div>
    </div>
  );
}
