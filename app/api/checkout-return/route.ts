// src/app/checkout-return/route.ts

import { setMonthlyPayment, setOneTimePayment } from "@/app/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(apiKey);

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const stripeSessionId = searchParams.get("session_id");
  const type = searchParams.get("type");

  if (!stripeSessionId?.length) return redirect("/pricing");

  const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

  if (session.status === "complete") {
    // Go to a success page!
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (type === "monthly") {
      await setMonthlyPayment(user.id);
    }

    if (type === "one-time") {
      await setOneTimePayment(user.id);
    }

    return redirect(`/dashboard`);
  }

  if (session.status === "open") {
    // Here you'll likely want to head back to some pre-payment page in your checkout
    // so the user can try again
    return redirect(`/pricing`);
  }

  return redirect("/pricing");
};
