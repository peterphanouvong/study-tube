import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RiExternalLinkLine } from "react-icons/ri";
import { EnterUrlForm } from "./enter-url-form";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser<{
    paidonetime: "true" | "false";
    freesummaries: number;
  }>();

  if (!user) {
    redirect(
      "/api/auth/login?connection_id=conn_0193b2c61eaf67e9e82e2204cd5ac002"
    );
  }

  return (
    <div>
      <Dialog defaultOpen={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Use StudyTube on YouTube?</DialogTitle>
            <DialogDescription>
              Head to YouTube to watch videos and use StudyTube!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="https://youtube.com" target="_blank">
                Go to YouTube <RiExternalLinkLine className="h-4 w-4" />
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h2 className="font-bold tracking-tight text-xl mb-4">
        Summarize YouTube video
      </h2>

      <EnterUrlForm />
    </div>
  );
}
