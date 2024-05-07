import { firestore } from "firebase-admin";
export default async function getLayoutDocument(path: string) {
  console.log("Fetching Layout", new Date().toISOString())
  const db = firestore();
  const collectionRef = db.collection("layouts");
  const docData = await collectionRef.doc(path).get();
  return docData;
}
