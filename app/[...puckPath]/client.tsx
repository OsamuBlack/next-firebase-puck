"use client"
import config from "@/puck/configPage";
import { Config, Render } from "@measured/puck";

export default function Client({ data }: { data: any }) {
  return <Render config={config as Config} data={data} />;
}
