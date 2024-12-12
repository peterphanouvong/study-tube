import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Video } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Layout(props: { children?: React.ReactNode }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6 text-indigo-600" />
          <span className="font-semibold text-xl">StudyTube</span>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size="icon"
                className="rounded-full w-12 h-12"
              >
                <Avatar>
                  <AvatarImage src={user.picture || ""} alt="@shadcn" />
                  <AvatarFallback>
                    {user.given_name ? user.given_name[0] : "X"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {props.children}
    </div>
  );
}
