import { firestore } from "firebase-admin";

export default async function getTemplateDocument(puckPath: string) {
  const path = !puckPath.length ? "default" : puckPath;

  const db = firestore();
  const collectionRef = db.collection("templates");
  const docData = await collectionRef.doc(path).get();
  return docData;
}
