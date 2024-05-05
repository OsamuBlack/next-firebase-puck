"use client";

import type { Config, Data } from "@measured/puck";
import { Button, Puck } from "@measured/puck";
import config from "@/puck/configPage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "@/lib/firebase";
import { useMessage } from "@/lib/messageProvider";
import MessageScreen from "@/components/messageScreen";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import CreateNewModal from "./add";
import { FaPlus } from "react-icons/fa";

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
  const disclosure = useDisclosure();
  if (!data)
    return <MessageScreen message="Error loading the data" color="danger" />;
  return (
    <>
      <Puck
        config={config as Config}
        overrides={{
          headerActions: (props) => {
            const recordsArray = Object.entries(records);
            return (
              <div className="flex gap-4 justify-center items-center">
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
                            router.push(
                              `${key == "/homepage" ? "" : key}/editPage`
                            );
                            message.setInfo("Loading page...");
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
                <Button
                  variant="primary"
                  icon={<FaPlus />}
                  onClick={disclosure.onOpen}
                >
                  Add
                </Button>
              </div>
            );
          },
        }}
        data={data}
        onPublish={async (data: Data) => {
          const db = getFirestore(firebase_app);
          try {
            await setDoc(doc(db, "pages", path), data);
            await setDoc(
              doc(db, "records", "pages"),
              {
                [path]: data.root.props?.title || "Untitled",
              },
              { merge: true }
            );
            message.setSuccess("Page published successfully");
          } catch (e) {
            console.error(e);
            message.setError("Error publishing page: " + (e as any).code);
          }
        }}
      />
      <CreateNewModal disclosure={disclosure}></CreateNewModal>
    </>
  );
}
