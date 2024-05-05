import { Metadata } from "next";
import admin from "@/lib/firebaseAdmin";
import { firestore } from "firebase-admin";
import { Data } from "@measured/puck";
import getTemplateDocument from "@/lib/utilities/getTemplate";
import Client from "./client";

export async function generateMetadata({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  return {
    title: "Template Builder",
  };
}

admin;
export default async function Template({
  params: { puckPath = "" },
}: {
  params: { puckPath: string };
}) {
  const path = !puckPath.length ? "default" : puckPath;

  const dataDoc = await getTemplateDocument(puckPath);
  const recordsDoc = await firestore()
    .collection("records")
    .doc("templates")
    .get();
  let data: Data,
    records: { [key: string]: string } = {};
  if (dataDoc.exists) {
    data = dataDoc.data() as Data;
  } else {
    data = {
      content: [],
      root: {
        props: {
          title: "Unsaved Template",
        },
      },
      zones: {},
    };
  }
  if (recordsDoc.exists) {
    records = recordsDoc.data() as { [key: string]: string };
  }

  return <Client path={path} data={data} records={records} />;
}

export const dynamic = "force-dynamic";
