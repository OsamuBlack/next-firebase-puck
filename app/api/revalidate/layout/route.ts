import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import admin from "@/lib/firebaseAdmin";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") || "no-secret";

  if (secret == process.env.SECRET) {
    revalidateTag("layout");
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({
    message: "Unauthorized",
  });
}

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (token) {
    admin;
    let session: DecodedIdToken | undefined;
    try {
      session = await auth().verifyIdToken(token || "");
    } catch (e) {
      console.error("Error verifying token", e);
    }
    if (session) {
      const userDoc = await firestore()
        .collection("users")
        .doc(session.uid)
        .get();
      const doc = userDoc.data();
      if (doc && (doc.role == "admin" || doc.role == "editor")) {
        revalidateTag("layout");
        return Response.json({ revalidated: true, now: Date.now() });
      }
    }
  }

  return NextResponse.json({
    message: "Unauthorized",
  });
}
