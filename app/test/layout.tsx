import { Data } from "@measured/puck";
import { Metadata } from "next";
import getLayoutDocument from "@/lib/utilities/getLayout";
import admin from "@/lib/firebaseAdmin";
import { appCheck } from "firebase-admin";

admin;

export async function generateMetadata(): Promise<Metadata> {
  const layoutDoc = await getLayoutDocument("default");

  const { token } = await appCheck().createToken(
    process.env.NEXT_PUBLIC_APP_ID as string
  );

  const claim = await appCheck().verifyToken(token);

  if (layoutDoc.exists) {
    const layoutData = layoutDoc.data() as Data;
    return {
      title: layoutData.root.props?.title || "Site",
      description: layoutData.root.props?.description,
      metadataBase: layoutData.root.props?.canonical,
      icons: {
        icon: [
          {
            media: "(prefers-color-scheme: light)",
            url: layoutData.root.props?.icon.light,
            href: layoutData.root.props?.icon.light,
          },
          {
            media: "(prefers-color-scheme: dark)",
            url: layoutData.root.props?.icon.dark,
            href: layoutData.root.props?.icon.dark,
          },
        ],
      },
      openGraph: {
        title: layoutData.root.props?.title,
        description: layoutData.root.props?.description,
        images: layoutData.root.props?.ogImages?.map((image: any) => ({
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt,
        })),
      },
      twitter: {
        title: layoutData.root.props?.title,
        description: layoutData.root.props?.description,
        images: layoutData.root.props?.ogImages?.map((image: any) => ({
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt,
        })),
      },
    };
  }
  return {
    title: "Site Title",
  };
}

export default function layout() {
  return (
    <div>
      <h1>Layout</h1>
    </div>
  );
}
