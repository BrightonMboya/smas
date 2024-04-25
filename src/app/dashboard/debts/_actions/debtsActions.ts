"use server";
import { createClient } from "~/utils/supabase/server";
import { QueryClient } from "@tanstack/react-query";
import { UUID, randomUUID } from "crypto";

const supabase = createClient();

export async function fetchDebts() {
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("Debts")
    .select()
    .eq("organizations_id", user.data?.user?.id!);
  return { data, error };
}

interface AddDebtsSchema {
  debtorName: string;
  amount: number;
  date: Date;
  organizations_id: string;
}

export async function addDebt(debtsData: AddDebtsSchema) {
  const { data, error } = await supabase.from("Debts").insert({
    debtorName: debtsData.debtorName,
    amount: debtsData.amount,
    date: debtsData.date,
    id: randomUUID(),
    organizations_id: debtsData.organizations_id,
  });

  return { data, error };
}
