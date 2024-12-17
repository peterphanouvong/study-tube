import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async () => {
  const returnUrl =
    "http://localhost:3000/api/checkout-return?session_id={CHECKOUT_SESSION_ID}&type=one-time";

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1QUh9hIqnjgcSWvmohdAQIU7",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: returnUrl,
      cancel_url: "http://localhost:3000/dashboard?canceled=true",
      automatic_tax: { enabled: true },
    });

    return Response.redirect(session.url!, 303);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response("An error occurred", { status: 500 });
  }
};
