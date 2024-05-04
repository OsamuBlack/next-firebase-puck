"use client";

import type { Config, Data } from "@measured/puck";
import { Button, Puck } from "@measured/puck";
import config from "@/puck/config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "@/lib/firebase";
import { useMessage } from "@/lib/messageProvider";
import MessageScreen from "@/components/messageScreen";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Client({
  path,
  data,
  records,
}: {
  path: string;
  data: Data;
  records: {
    [key: string]: string;
  };
}) {
  const message = useMessage();
  const router = useRouter();
  if (!data)
    return <MessageScreen message="Error loading the data" color="danger" />;
  return (
    <Puck
      config={config as Config}
      overrides={{
        headerActions: (props) => {
          const recordsArray = Object.entries(records);
          return (
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <a>
                    <Button variant="secondary">Select Page</Button>
                  </a>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  disabledKeys={["", path]}
                >
                  {recordsArray.length ? (
                    recordsArray.map(([key, value]) => (
                      <DropdownItem
                        key={key}
                        onClick={() => {
                          router.push(`${key}/edit`);
                        }}
                      >
                        {value}
                      </DropdownItem>
                    ))
                  ) : (
                    <DropdownItem key="">No pages found</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        },
      }}
      data={data}
      onPublish={async (data: Data) => {
        // Publish to firebase pages collection
        const db = getFirestore(firebase_app);
        try {
          // Transaction to set two documents one for the page other for record which takes the slug and title of the page as key value pairs.
          await setDoc(doc(db, "pages", path), data);
          await setDoc(doc(db, "records", "pages"), {
            [path]: data.root.props?.title || "Untitled",
          });
          message.setSuccess("Page published successfully");
        } catch (e) {
          console.error(e);
          message.setError("Error publishing page: " + (e as any).code);
        }
      }}
    />
  );
}
