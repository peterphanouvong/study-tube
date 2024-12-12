import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { VideoSummarizer } from "./video-summarizer";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser<{
    paidonetime: "true" | "false";
    freesummaries: number;
  }>();

  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      {/* {user.properties?.paidonetime === "true" ? (
        <div>
          <h1>Go to youtube</h1>

          <p>Here is your secret content</p>
        </div>
      ) : (
        <div>
          <PricingPage />
        </div>
      )} */}
      <VideoSummarizer />
      <LogoutLink>Logout</LogoutLink>
    </div>
  );
}
