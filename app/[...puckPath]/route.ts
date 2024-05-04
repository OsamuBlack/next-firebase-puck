import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import admin from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
  const path = request.nextUrl.basePath;
  const data = await request.json();
  const secret = data.secret;
  const token = data.token;

  if (path) {
    if (secret == process.env.SECRET) {
      revalidatePath(path);
      return Response.json({ revalidated: true, now: Date.now() });
    } else if (token) {
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
          revalidatePath(path);
          return Response.json({ revalidated: true, now: Date.now() });
        }
      }
    }
  }

  return NextResponse.json({
    message: "Unauthorized",
  });
}
