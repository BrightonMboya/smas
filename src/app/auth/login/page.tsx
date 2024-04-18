import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Input from "~/components/ui/Input";
import { Label } from "~/components/ui/label";
import { cn } from "~/utils/utils";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      return redirect("/auth/sign-in?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error.message);
      return redirect("auth/sign-in?message=Could not authenticate user");
    }

    return redirect("/auth/sign-in?message=Check email to continue sign in process");
  };

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
