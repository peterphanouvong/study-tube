import {
  onUserTokenGeneratedEvent,
  WorkflowSettings,
  WorkflowTrigger,
  accessTokenCustomClaims,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
  },
  name: "Access token custom claims",
  failurePolicy: {
    action: "stop",
  },
};

export default async function Workflow(event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    hello: string;
    ipAddress: string;
  }>();

  accessToken.hello = "Hello there!";
  accessToken.ipAddress = event.request.ip;
}
