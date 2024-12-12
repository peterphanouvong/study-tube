"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { init, Users } from "@kinde/management-api-js";
import { revalidatePath } from "next/cache";

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
