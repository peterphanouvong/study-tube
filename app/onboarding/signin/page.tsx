import { GoogleRegisterButton } from "@/components/google-register-button";

export default function SignIn() {
  return (
    <div className="text-center">
      <div className="mt-32">
        <h1 className="text-7xl font-bold tracking-tight">
          Successfully installed
          <br />
          <span className="text-blue-600">StudyTube</span>
        </h1>
      </div>

      <div className="mt-12">
        <GoogleRegisterButton />
      </div>
    </div>
  );
}
