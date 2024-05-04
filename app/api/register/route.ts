import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import admin from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const token = data?.token;

  console.log(data);

  if (token) {
    admin;
    let session: DecodedIdToken | undefined;
    try {
      session = await auth().verifyIdToken(token || "");
      console.log(session);
      if (session) {
        await firestore()
          .collection("users")
          .doc(session.uid)
          .set({ email: session.email });
      }
    } catch (e) {
      console.error("Error verifying token", e);
    }
  }

  return NextResponse.json({
    message: "Unauthorized",
    code: 401,
  });
}
