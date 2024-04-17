import { redirect } from "next/navigation";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createClient } from "~/utils/supabase/server";
import { authSchema } from "~/components/auth/SignUpForm";

export const auth = createTRPCRouter({
  signUp: publicProcedure.input(authSchema).mutation(async ({ input }) => {
      console.log(input, ">>>>>")
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
      });

      if (error) {
        redirect("/auth/error");
      }
      redirect("/accounting");
    } catch (cause) {
      console.log(cause);
    }
  }),
});
