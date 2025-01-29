import {
  onUserTokenGeneratedEvent,
  accessTokenCustomClaims,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
  },
};

export default async function (event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    hello: string;
    ipAddress: string;
  }>();

  accessToken.hello = "Hello there!";
  accessToken.ipAddress = event.request.ip;
},