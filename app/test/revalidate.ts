"use server";

import admin from "@/lib/firebaseAdmin";
import { auth, firestore } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { revalidatePath } from "next/cache";

export default async function Revlaidate(path: string, token: string) {
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
        revalidatePath(path);
      }
    }
  }
}
