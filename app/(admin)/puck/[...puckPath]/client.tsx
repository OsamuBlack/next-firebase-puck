"use client";

import type { Config, Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "@/puck/config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "@/lib/firebase";
import { useMessage } from "@/lib/messageProvider";
import MessageScreen from "@/components/messageScreen";

export function Client({ path, data }: { path: string; data: Data }) {
  const message = useMessage();
  if (!data)
    return <MessageScreen message="Error loading the data" color="danger" />;
  return (
    <Puck
      config={config as Config}
      data={data}
      onPublish={async (data: Data) => {
        // Publish to firebase pages collection
        const db = getFirestore(firebase_app);
        try {
          await setDoc(doc(db, "pages", path), data);
          message.setSuccess("Page published successfully");
        } catch (e) {
          console.error(e);
          message.setError("Error publishing page: " + (e as any).code);
        }
      }}
    />
  );
}
