import { getNumFreeSummaries, getPlan } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Billing() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const freeSummaries = await getNumFreeSummaries(user?.id);
  const plan = await getPlan(user?.id);
  return (
    <div>
      <h2>Billing</h2>
      <p>Free summaries remaining: {freeSummaries}</p>
      <p>Plan: {plan}</p>
      <div className="my-4">
        <Button variant={"default"} asChild>
          <Link href="/pricing">Upgrade plan</Link>
        </Button>
      </div>
    </div>
  );
}
