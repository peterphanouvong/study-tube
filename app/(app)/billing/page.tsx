import { getNumFreeSummaries, getPlan } from "@/app/actions";
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
import { Progress } from "@/components/ui/progress";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { plans } from "../pricing/page";

export default async function Billing() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const freeSummaries = await getNumFreeSummaries(user?.id);
  const plan = await getPlan(user?.id);
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Current Plan Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Manage your subscription and usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  {plans.find((p) => p.id == plan)?.name} Plan
                </h3>
                {/* <p className="text-gray-500">
                  Renews on{" "}
                  {new Date(subscription.renewalDate).toLocaleDateString()}
                </p> */}
              </div>
              <Badge variant={"outline"} className="text-sm">
                Active
              </Badge>
            </div>

            {/* Credits Usage */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Free Summaries Used</span>
                <span>{freeSummaries} free summaries remaining</span>
              </div>
              <Progress value={(5 - freeSummaries / 5) * 100} className="h-2" />
              <p className="text-sm text-gray-500">
                {5 - freeSummaries} of {5} credits used
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link
                href={`https://billing.stripe.com/p/login/test_5kA6px9mg9eN4aQaEE?prefilled_email=${user.email}`}
              >
                Cancel Subscription
              </Link>
            </Button>

            <Button asChild>
              <Link
                href={`https://billing.stripe.com/p/login/test_5kA6px9mg9eN4aQaEE?prefilled_email=${user.email}`}
              >
                Manage Payment Methods
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div>
          <Button asChild variant={"link"}>
            <Link href="/pricing">See all plans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
