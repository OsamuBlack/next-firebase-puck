import getPageDocument from "@/lib/getPage";
import config from "@/puck/config";
import { Config, Data } from "@measured/puck";
import { Render } from "@measured/puck/rsc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  const doc = await getPageDocument(puckPath);

  return {
    title: doc.data()?.root.title,
  };
}

export default async function Page({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}) {
  const doc = await getPageDocument(puckPath);

  let data: Data;
  if (doc.exists) {
    data = doc.data() as Data;
  } else {
    return notFound();
  }

  return <Render config={config as Config} data={data} />;
}
