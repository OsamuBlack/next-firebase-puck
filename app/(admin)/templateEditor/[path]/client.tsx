"use client";

import { Editor } from "@/components/puck/editor";
import config from "@/puck/configPage";
import CreateNewModal from "./add";
import DeleteModal from "@/components/puck/delete";
import { Config } from "@measured/puck";

export default function Client({
  path,
  data,
  records,
}: {
  path: string;
  data: any;
  records: { [key: string]: string };
}) {
  return (
    <Editor
      path={path}
      data={data}
      records={Object.entries(records).map(([path, title]) => ({
        key: path,
        path: `${path == "default" ? "" : "/" + path}/editTemplate`,
        label: title,
      }))}
      collection={"templates"}
      singularName="Template"
      name="Templates"
      config={config as Config}
      CreateNewModal={CreateNewModal}
      DeleteModal={DeleteModal}
    />
  );
}
