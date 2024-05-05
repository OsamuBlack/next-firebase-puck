"use client";

import { Editor } from "@/components/puck/editor";
import config from "@/puck/configLayout";
import { Config, Data } from "@measured/puck";

export default function Client({ data }: { data: any }) {
  return (
    <Editor
      path={"default"}
      data={data}
      collection={"layouts"}
      singularName="Layout"
      name="Layouts"
      config={config as Config}
      checkError={(data: Data) => {
        if (
          data.content.filter((block) => block.type == "Content").length !== 1
        ) {
          return "Layout must have exactly one content block";
        }
        return false;
      }}
      revaildateRoute="/api/revalidate/layout"
    />
  );
}
