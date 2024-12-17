"use server";

import { createClient } from "@/lib/supabase/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { init, Users } from "@kinde/management-api-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const setHasPaid = async (userId: string, hasPaid: boolean) => {
  init();
  const { refreshTokens } = getKindeServerSession();
  await Users.updateUserProperty({
    propertyKey: "paidonetime",
    userId,
    value: hasPaid.toString(),
  });

  await refreshTokens();
  revalidatePath("/dashboard");
};

export const addUserToDb = async (userId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.from("profiles").insert([{ kinde_id: userId }]);
};
