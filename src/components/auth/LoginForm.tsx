"use client";
import { SignIn } from "@clerk/nextjs";

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
        <SignIn
          afterSignInUrl="/accounting"
          // routing="path"
          // path="/auth/sign-in"
          signUpUrl="/auth/sign-up"
        />
      </div>
    </div>
  );
}
