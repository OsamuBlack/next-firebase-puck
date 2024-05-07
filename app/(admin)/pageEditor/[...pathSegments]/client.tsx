"use client";

import { Editor } from "@/components/puck/editor";
import config from "@/puck/configPage";
import CreateNewModal from "./add";
import DeleteModal from "@/components/puck/delete";
import { Config } from "@measured/puck";
import Dropdown from "@/components/puck/dropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function pageIdToURL(path: string) {
  return path == "/homepage" ? "" : path;
}

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
  const template = useSearchParams().get("template");
  const router = useRouter();
  const templatesArray = Object.entries(templates).map(
    ([templatePath, title]) => ({
      key: path,
      path: `${pageIdToURL(path)}/editPage?template=${templatePath}`,
      label: title,
    })
  );

  useEffect(() => {
    if (template) {
      router.refresh();
    }
  }, [template]);

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
        path: `${pageIdToURL(path)}/editPage`,
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
