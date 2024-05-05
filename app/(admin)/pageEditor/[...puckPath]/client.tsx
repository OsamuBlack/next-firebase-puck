"use client";

import { Editor } from "@/components/puck/editor";
import config from "@/puck/configPage";
import CreateNewModal from "./add";
import DeleteModal from "@/components/puck/delete";
import { Config } from "@measured/puck";
import Dropdown from "@/components/puck/dropdown";

export default function Client({
  path,
  data,
  records,
  templates,
}: {
  path: string;
  data: any;
  records: { [key: string]: string };
  templates: { [key: string]: string };
}) {
  const templatesArray = Object.entries(templates).map(
    ([templatePath, title]) => ({
      key: path,
      path: `${
        path == "/homepage" ? "" : path
      }/editPage?template=${templatePath}`,
      label: title,
    })
  );
  return (
    <Editor
      path={path}
      data={data}
      Action={(unsaved) => (
        <Dropdown
          items={templatesArray}
          name="Templates"
          buttonText="Use Template"
          unsaved={unsaved}
          path=""
        />
      )}
      records={Object.entries(records).map(([path, title]) => ({
        key: path,
        path: `${path == "/homepage" ? "" : path}/editPage`,
        label: title,
      }))}
      collection={"pages"}
      singularName="Page"
      name="Pages"
      config={config as Config}
      revaildateRoute={"/api/revalidate"}
      CreateNewModal={CreateNewModal}
      DeleteModal={DeleteModal}
    />
  );
}
