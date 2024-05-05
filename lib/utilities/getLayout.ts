import { firestore } from "firebase-admin";
import admin from "../firebaseAdmin";

admin;
export default async function getLayoutDocument(path: string) {
  const db = firestore();
  const collectionRef = db.collection("layouts");
  const docData = await collectionRef.doc(path).get();
  return docData;
}
