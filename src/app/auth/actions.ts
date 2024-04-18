"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "~/utils/supabase/server";

export const signIn = async (formData: FormData) => {
  "use server";
  console.log(formData.entries.toString())

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();
  console.log(email, password, "???????");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.message);
    return redirect("/auth/sign-in?message=Could not authenticate user");
  }

  return redirect("/dashboard/accounting");
};

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("I got an error");
    console.log(error);
    redirect("/auth/error");
  }

  revalidatePath("/", "layout");
  console.log("I got  a redirect");
  redirect("/accounting");
}

interface AuthProps {
  email: string;
  password: string;
}

export async function signup({ email, password }: AuthProps) {
  const supabase = createClient();

  console.log(email, password);
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log("I got an error", error);
    redirect("/auth/error");
  }

  revalidatePath("/", "layout");
  redirect("/accounting");
}
