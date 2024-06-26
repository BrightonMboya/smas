import Image from "next/legacy/image";
import SignUpForm from "./SignUpForm";

import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  return (
    <>
      <Toaster />

      <div className="container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900 " />
          <Image
            src="https://images.unsplash.com/photo-1664575602807-e002fc20892c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3N8ZW58MHwxfDB8fHww"
            alt="hero"
            layout="fill"
            className="object-cover opacity-40"
          />

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This software has streamlined every process of my
                company.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="mx-auto flex h-screen w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          <div className="grid gap-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Thank you for choosing smas
              </h1>
              <p className="text-sm text-muted-foreground">
                Create an account to get started
              </p>
            </div>
            <SignUpForm/>
          </div>
        </div>
      </div>
    </>
  );
}
