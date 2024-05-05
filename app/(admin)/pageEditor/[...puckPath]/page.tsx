import { Metadata } from "next";
import admin from "@/lib/firebaseAdmin";
import { firestore } from "firebase-admin";
import { Data } from "@measured/puck";
import getPageDocument from "@/lib/utilities/getPage";
import Client from "./client";
import getTemplateDocument from "@/lib/utilities/getTemplate";

export async function generateMetadata({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  return {
    title: "Page Builder",
  };
}

admin;
export default async function Page({
  params: { puckPath = [] },
  searchParams,
}: {
  params: { puckPath: string[] };
  searchParams: { template: string | undefined };
}) {
  const path = !puckPath.length ? "/homepage" : `/${puckPath.join("/")}`;
  const queries = [
    firestore().collection("records").doc("pages").get(),
    firestore().collection("records").doc("templates").get(),
  ];
  console.log(searchParams)
  if (searchParams.template) {
    queries.push(getTemplateDocument(searchParams.template));
  } else {
    queries.push(getPageDocument(path));
  }

  const responses = await Promise.all(queries);
  const recordsDoc = responses[0];
  const templateDocs = responses[1];
  const dataDoc = responses[2];
  let data: Data,
    records: { [key: string]: string } = {},
    templates: { [key: string]: string } = {};
  if (dataDoc.exists) {
    data = dataDoc.data() as Data;
  } else {
    data = {
      content: [],
      root: {
        props: {
          title: "Unsaved Page",
        },
      },
      zones: {},
    };
  }
  if (recordsDoc.exists) {
    records = recordsDoc.data() as { [key: string]: string };
  }
  if (templateDocs.exists) {
    templates = templateDocs.data() as { [key: string]: string };
  }
  return (
    <Client path={path} data={data} records={records} templates={templates} />
  );
}

export const dynamic = "force-dynamic";
