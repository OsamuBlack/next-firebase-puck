import { Metadata } from "next";
import { Client } from "@/components/puck/client";
import admin from "@/lib/firebaseAdmin";
import { firestore } from "firebase-admin";
import { Config, Data } from "@measured/puck";
import getLayoutDocument from "@/lib/utilities/getLayout";
import CreateNewModal from "./add";
import DeleteModal from "./delete";
import validateLayout from "./validate";
import config from "@/puck/configLayout";

export async function generateMetadata({
  params: { puckPath = "" },
}: {
  params: { puckPath: string };
}): Promise<Metadata> {
  return {
    title: "Layout Builder",
  };
}

admin;
export default async function Layout({
  params: { puckPath = "" },
}: {
  params: { puckPath: string };
}) {
  // Disabling for now as it needs working
  // const path = !puckPath.length
  //   ? "default"
  //   : `${puckPath.replace("/editLayout", "")}`;

  const path = "root";

  const dataDoc = await getLayoutDocument(path);
  // const recordsDoc = await firestore()
  //   .collection("records")
  //   .doc("layouts")
  //   .get();
  let data: Data,
    records: { [key: string]: string } = {};
  if (dataDoc.exists) {
    data = dataDoc.data() as Data;
  } else {
    data = {
      content: [],
      root: {
        props: {
          title: "Unsaved Layout",
        },
      },
      zones: {},
    };
  }

  // if (recordsDoc.exists) {
  //   records = recordsDoc.data() as { [key: string]: string };
  // }
  return (
    <Client
      path={path}
      data={data}
      config={config as Config}
      // records={records}
      collection={"layouts"}
      singularName="Layout"
      name="Layouts"
      // CreateNewModal={CreateNewModal}
      // DeleteModal={DeleteModal}
      checkError={validateLayout}
    />
  );
}
