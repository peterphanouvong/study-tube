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
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  RiBankCardLine,
  RiExternalLinkLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

export default async function Layout(props: {
  params?: {
    youtubeLink?: string[];
  };
  children?: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect(
      "/api/auth/login?connection_id=conn_0193b2c61eaf67e9e82e2204cd5ac002"
    );
  }
  return (
    <div>
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="md:text-xl tracking-tighter font-bold font-spaceGrotesk"
            >
              StudyTube
            </Link>
          </div>
          <Button variant={"link"} asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant={"link"} asChild>
            <Link href="https://youtube.com" target="_blank">
              Use on YouTube <RiExternalLinkLine className="h-4 w-4" />
            </Link>
          </Button>
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
              <DropdownMenuItem asChild>
                <Link href={"/billing"}>
                  <RiBankCardLine className="mr-2" /> Plans and billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutLink>
                  <RiLogoutBoxLine className="mr-2" /> Logout
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div className="p-6 max-w-7xl mx-auto">{props.children}</div>
    </div>
  );
}
