import { redirect } from "next/navigation";
import { createTRPCRouter, publicProcedure , protectedProcedure} from "../trpc";
import { createClient } from "~/utils/supabase/server";
import { authSchema } from "~/components/auth/SignUpForm";

export const auth = createTRPCRouter({
  getProfile: protectedProcedure
  .query(async ({ctx}) => {
    return ctx.user.id
  })
});
