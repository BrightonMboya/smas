import * as React from "react";
import { cn } from "~/utils/utils";

import Input from "../ui/Input";
import { Label } from "../ui/label";
import { signIn } from "~/app/auth/actions";

import { SubmitButton } from "~/app/auth/login/submit-button";

export function UserAuthForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className={cn("grid gap-6")}>
      <form className="animate-in flex w-full flex-1 flex-col justify-center gap-2 ">
        <Label className="text-md" htmlFor="email">
          Email
        </Label>
        <Input
          className=" rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <Label className="text-md mt-5" htmlFor="password">
          Password
        </Label>
        <Input
          className=" rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>

        {searchParams?.message && (
          <p className="mt-4  p-4 text-center text-red-500">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
