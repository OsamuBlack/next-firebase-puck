import getPageDocument from "@/lib/utilities/getPage";
import { Config, Data } from "@measured/puck";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Render } from "@measured/puck/rsc";
import config from "@/puck/configPage";
import admin from "@/lib/firebaseAdmin";

admin;
export async function generateMetadata(
  {
    params: { pathSegments = [] },
  }: {
    params: { pathSegments: string[] };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const path = pathSegments.length ? pathSegments.join("/") : "/homepage";
  const doc = await getPageDocument(path);
  const parentData = await parent;
  const docData = doc.data();
  if (doc.exists && docData) {
    const images = docData.root.props?.ogImages;
    return {
      title: docData.root.props?.title + " | " + parentData.title?.absolute,
      description: docData.root.props?.description,
      metadataBase: docData.root.props?.canonical,
      openGraph: {
        title: docData.root.props?.title,
        description: docData.root.props?.description,
        images: images?.length
          ? images.map((image: any) => ({
              url: image.url,
              width: image.width,
              height: image.height,
              alt: image.alt,
            }))
          : undefined,
      },
      twitter: {
        title: docData.root.props?.title,
        description: docData.root.props?.description,
        images: images?.length
          ? images.map((image: any) => ({
              url: image.url,
              width: image.width,
              height: image.height,
              alt: image.alt,
            }))
          : undefined,
      },
    };
  } else {
    return {
      title: "Not Fount | " + parentData.title?.absolute,
    };
  }
}

export default async function Page({
  params: { pathSegments = [] },
}: {
  params: { pathSegments: string[] };
}) {
  const path = pathSegments.length ? pathSegments.join("/") : "/homepage";
  const doc = await getPageDocument(path);
  let data: Data;
  if (doc.exists) {
    data = doc.data() as Data;
  } else {
    return notFound();
  }

  return <Render config={config as Config} data={data} />;
}
