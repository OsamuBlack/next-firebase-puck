import { firestore } from "firebase-admin";

export default async function getTemplateDocument(path: string) {
  const db = firestore();
  const collectionRef = db.collection("templates");
  const docData = await collectionRef.doc(path).get();
  return docData;
}
