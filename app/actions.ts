"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const addUserToDb = async (userId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.from("profiles").insert([{ kinde_id: userId }]);
};

export const getCanSummarize = async (userId?: string) => {
  if (!userId) return false;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: result } = await supabase
    .from("profiles")
    .select()
    .eq("kinde_id", userId)
    .single();

  if (!result) return false;

  if (result.free_summaries > 0) {
    return true;
  }

  if (result.paid_one_time_subscription) return true;

  if (result.is_on_monthly_subscription) return true;

  return false;
};

export const setOneTimePayment = async (userId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("profiles")
    .update({ paid_one_time_subscription: true })
    .eq("kinde_id", userId);

  if (error) return error;

  return data;
};

export const setMonthlyPayment = async (userId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("profiles")
    .update({ is_on_monthly_subscription: true })
    .eq("kinde_id", userId);

  if (error) return error;

  return data;
};

export const consumeSummary = async (userId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: result } = await supabase
    .from("profiles")
    .select()
    .eq("kinde_id", userId)
    .single();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      free_summaries:
        result.free_summaries > 0 ? Number(result.free_summaries) - 1 : 0,
      num_summaries: Number(result.num_summaries) + 1,
    })
    .eq("kinde_id", userId);

  if (error) return error;

  return data;

  // await supabase.from("profiles").update({});
};

export const getNumFreeSummaries = async (userId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: result } = await supabase
    .from("profiles")
    .select()
    .eq("kinde_id", userId)
    .single();

  return result.free_summaries;
};

export const getPlan = async (userId?: string) => {
  if (!userId) return "free";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: result } = await supabase
    .from("profiles")
    .select()
    .eq("kinde_id", userId)
    .single();

  if (result.paid_one_time_subscription) return "one-time";

  if (result.is_on_monthly_subscription) return "monthly";

  return "free";
};
