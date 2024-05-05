import getPageDocument from "@/lib/utilities/getPage";
import { Data } from "@measured/puck";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Client from "./client";

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

  return <Client data={data} />;
}
