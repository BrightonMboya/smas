"use client";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { UserAuthForm } from "./UserAuthForm";

export function LoginForm() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center justify-center space-y-6  sm:w-[350px]">
      <div className="grid gap-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to login
          </p>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have an acccount?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign Up
              </Link>{" "}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
