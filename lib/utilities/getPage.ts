import { firestore } from "firebase-admin";

export default async function getPageDocument(path: string) {
  const db = firestore();
  const collectionRef = db.collection("pages");
  const docData = await collectionRef.doc(path).get();
  return docData;
}
