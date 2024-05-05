import { Metadata } from "next";
import admin from "@/lib/firebaseAdmin";
import { Data } from "@measured/puck";
import getLayoutDocument from "@/lib/utilities/getLayout";
import Client from "./client";
import { getAppCheck } from "firebase-admin/app-check";

admin;
export async function generateMetadata({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  return {
    title: "Layout Builder",
  };
}

export default async function Page() {
  const dataDoc = await getLayoutDocument("default");

  let data: Data;
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
    };
  }
  return <Client data={data} />;
}

export const dynamic = "force-dynamic";
