import getLayoutDocument from "@/lib/utilities/getLayout";
import config from "@/puck/configLayout";
import { Config, Data, Render } from "@measured/puck";

export default async function Layout({ children }: { children: string }) {
  const layoutDoc = await getLayoutDocument("root");
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
