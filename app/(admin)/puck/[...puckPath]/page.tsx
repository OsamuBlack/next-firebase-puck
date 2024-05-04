import { Metadata } from "next";
import { Client } from "./client";
import admin from "@/lib/firebaseAdmin";
import { firestore } from "firebase-admin";
import { Data } from "@measured/puck";
import getPageDocument from "@/lib/getPage";

export async function generateMetadata({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  const path = `/${puckPath.join("/").replace("/edit", "")}`;

  return {
    title: "Page Builder",
  };
}

admin;
export default async function Page({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}) {
  const path = !puckPath.length
    ? "/homepage"
    : `/${puckPath.join("/").replace("/edit", "")}`;

  const dataDoc = await getPageDocument(puckPath);
  const recordsDoc = await firestore().collection("records").doc("pages").get();
  let data: Data,
    records: { [key: string]: string } = {};
  if (dataDoc.exists) {
    data = dataDoc.data() as Data;
  } else {
    data = {
      content: [],
      root: {
        props: {
          title: "New Page",
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
