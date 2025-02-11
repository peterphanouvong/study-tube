import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    description: "Pay month-to-month, cancel anytime",
    price: 5,
    features: [
      "AI-powered video summarization",
      "Smart timestamp navigation",
      "Distraction-free viewing mode",
      "Custom UI controls",
      "Background playback",
    ],
  },
  {
    id: "one-time",
    name: "Lifetime Access",
    description: "One-time payment, forever access",
    price: 39,
    features: [
      "AI-powered video summarization",
      "Smart timestamp navigation",
      "Distraction-free viewing mode",
      "Custom UI controls",
      "Background playback",
      "Lifetime updates included",
    ],
    discount: "40% OFF",
  },
];

const PricingPage = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your YouTube experience with smart summaries and
            distraction-free viewing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn({
                "border-blue-200 bg-blue-50/50":
                  plan.name === "Lifetime Access",
                "relative flex flex-col border-2": true,
              })}
            >
              {plan.discount && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="destructive" className="bg-red-500">
                    {plan.discount}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.name === "Monthly" && (
                    <span className="text-gray-600">/month</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <form
                  action={
                    plan.name === "Lifetime Access"
                      ? "/api/checkout_sessions"
                      : "/api/monthly_subscription"
                  }
                  method="POST"
                  className="w-full"
                >
                  <Button
                    type="submit"
                    role="link"
                    className={cn({
                      "w-full": true,
                      "bg-blue-600 hover:bg-blue-700":
                        plan.name === "Lifetime Access",
                    })}
                    size="lg"
                  >
                    {plan.name === "Lifetime Access"
                      ? "Get Lifetime Access"
                      : "Subscribe now"}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}
          {/* <Card className="relative flex flex-col border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Monthly</CardTitle>
              <CardDescription>
                Pay month-to-month, cancel anytime
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$5</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <form
                action="/api/monthly_subscription"
                method="POST"
                className="w-full"
              >
                <Button type="submit" role="link" className="w-full" size="lg">
                  Subscribe now
                </Button>
              </form>
            </CardFooter>
          </Card>

          <Card className="relative flex flex-col border-2 border-blue-200 bg-blue-50/50">
            <div className="absolute -top-3 right-4">
              <Badge variant="destructive" className="bg-red-500">
                40% OFF
              </Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Lifetime Access</CardTitle>
              <CardDescription>
                One-time payment, forever access
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$39</span>
                <span className="text-gray-600 ml-2 line-through text-sm">
                  $65
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium">Lifetime updates included</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <form
                action="/api/checkout_sessions"
                method="POST"
                className="w-full"
              >
                <Button
                  type="submit"
                  role="link"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  Get Lifetime Access
                </Button>
              </form>
            </CardFooter>
          </Card> */}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>✨ 14-day money-back guarantee</p>
          <p className="mt-2">🔒 Secure payment processing</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
