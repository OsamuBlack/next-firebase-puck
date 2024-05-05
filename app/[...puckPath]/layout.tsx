import admin from "@/lib/firebaseAdmin";
import getLayoutDocument from "@/lib/utilities/getLayout";
import config from "@/puck/configLayout";
import { Config, Data } from "@measured/puck";
import { Render } from "@measured/puck/rsc";
import { getAppCheck } from "firebase-admin/app-check";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

admin;
const getCachedLayout = unstable_cache(
  () => getLayoutDocument("default"),
  ["layout"]
);

export async function generateMetadata(): Promise<Metadata> {
  const layoutDoc = await getCachedLayout();
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

export default async function Layout({ children }: { children: string }) {
  const layoutDoc = await getCachedLayout();
  if (layoutDoc.exists) {
    const layoutData = layoutDoc.data() as Data;
    const contentPlacement = layoutData.content.findIndex(
      (block) => block.type == "Content"
    );

    const data: Data = {
      root: {},
      content: [],
    };

    const headerContent = layoutData.content.slice(0, contentPlacement),
      footerContent = layoutData.content.slice(contentPlacement + 1);
    return (
      <>
        {headerContent?.length ? (
          <Render
            config={config as Config}
            data={{
              root: {},
              content: headerContent || [],
            }}
          />
        ) : (
          ""
        )}
        {children}
        {footerContent?.length ? (
          <Render
            config={config as Config}
            data={{
              ...data,
              content: footerContent || [],
            }}
          />
        ) : (
          ""
        )}
      </>
    );
  }
  return children;
}
