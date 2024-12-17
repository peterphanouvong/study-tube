import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { addUserToDb } from "@/app/actions";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const { header } = jwt.decode(token, { complete: true }) as unknown as {
      header: { kid: string };
    };
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey) as {
      type: string;
      data: {
        user: {
          id: string;
        };
      };
    };

    // Handle various events
    switch (event?.type) {
      case "user.created":
        // handle user created event
        // e.g add user to database with event.data
        await addUserToDb(event.data.user.id as string);

        break;
      default:
        // other events that we don't handle
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}
