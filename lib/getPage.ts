import { firestore } from "firebase-admin";
import admin from "./firebaseAdmin";

admin;
export default async function getPageDocument(puckPath: string[]) {
  const path = !puckPath.length
    ? "/homepage"
    : `/${puckPath.join("/").replace("/edit", "")}`;

  const db = firestore();
  const collectionRef = db.collection("pages");
  const docData = await collectionRef.doc(path).get();
  return docData;
}
