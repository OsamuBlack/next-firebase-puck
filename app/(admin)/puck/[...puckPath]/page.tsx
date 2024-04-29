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

  const docData = await getPageDocument(puckPath);
  let data: Data;
  if (docData.exists) {
    data = docData.data() as Data;
  } else {
    data = {
      content: [],
      root: {
        title: "New Page",
      },
      zones: {},
    };
  }
  return <Client path={path} data={data} />;
}
