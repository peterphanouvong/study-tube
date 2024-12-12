import { FaGoogle } from "react-icons/fa6";
import { Button } from "./ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export const GoogleRegisterButton = () => {
  return (
    <Button variant="outline" asChild>
      <RegisterLink
        authUrlParams={{
          connection_id: "conn_0193b2c61eaf67e9e82e2204cd5ac002",
        }}
      >
        <FaGoogle className="mr-1" />
        Continue with Google
      </RegisterLink>
    </Button>
  );
};
