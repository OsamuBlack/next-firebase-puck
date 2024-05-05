import { Metadata } from "next";
import admin from "@/lib/firebaseAdmin";
import { firestore } from "firebase-admin";
import { Config, Data } from "@measured/puck";
import getPageDocument from "@/lib/utilities/getPage";
import { Client } from "@/components/puck/client";
import config from "@/puck/configPage";
import Revalidate from "./revalidate";
import CreateNewModal from "./add";
import DeleteModal from "./delete";
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
}: {
  params: { puckPath: string[] };
}) {
  const path = !puckPath.length
    ? "/homepage"
    : `/${puckPath.join("/").replace("/editPage", "")}`;

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
          title: "Unsaved Page",
        },
      },
      zones: {},
    };
  }
  if (recordsDoc.exists) {
    records = recordsDoc.data() as { [key: string]: string };
  }
  return (
    <Client
      path={path}
      data={data}
      records={records}
      collection={"pages"}
      singularName="Page"
      name="Pages"
      config={config as Config}
      revaildate={Revalidate}
      CreateNewModal={CreateNewModal}
      DeleteModal={DeleteModal}
    />
  );
}
