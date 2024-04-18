"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "~/utils/supabase/server";

export const signIn = async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/auth/sign-in?message=Could not authenticate user");
  }

  return redirect("/dashboard/accounting");
};

export const signOut = async () => {
  "use server";

  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/auth/sign-in");
};

interface AuthProps {
  email: string;
  password: string;
}

export const signUp = async (formData: FormData) => {
  "use server";

  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    // options: {
    //   emailRedirectTo: `${origin}/auth/callback`,
    // },
  });

  if (error) {
    console.log(error.message);
    return redirect("/auth/sign-up?message=Could not authenticate user");
  }

  return redirect("/dashboard/accounting");
};
