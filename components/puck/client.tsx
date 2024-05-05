"use client";

import type { Config, Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app, { auth } from "@/lib/firebase";
import { useMessage } from "@/lib/messageProvider";
import MessageScreen from "@/components/messageScreen";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaPlus, FaTrash } from "react-icons/fa";

export function Client({
  path,
  data,
  checkError,
  records,
  collection,
  singularName,
  name,
  CreateNewModal,
  DeleteModal,
  revaildate,
  config,
}: {
  path: string;
  data: Data;
  checkError?: (data: Data) => false | string;
  records?: {
    [key: string]: string;
  };
  collection: string;
  singularName: string;
  name: string;
  CreateNewModal?: ({
    disclosure,
  }: {
    disclosure: ReturnType<typeof useDisclosure>;
  }) => React.ReactNode;
  DeleteModal?: ({
    path,
    disclosure,
  }: {
    path: string;
    disclosure: ReturnType<typeof useDisclosure>;
  }) => React.ReactNode;
  revaildate?: (path: string, token: string) => Promise<void>;
  config: Config;
}) {
  const message = useMessage();
  const router = useRouter();
  const addDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  if (!data)
    return <MessageScreen message="Error loading the data" color="danger" />;
  return (
    <>
      <Puck
        config={config as Config}
        overrides={{
          headerActions: (props) => {
            if (records) {
              const recordsArray = Object.entries(records);
              return (
                <div className="flex gap-4 justify-center items-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm">Select {singularName}</Button>
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
                              message.setInfo(`Loading ${singularName}...`);
                            }}
                          >
                            {value}
                          </DropdownItem>
                        ))
                      ) : (
                        <DropdownItem key="">No {name} found</DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                  {CreateNewModal ? (
                    <Tooltip showArrow content={`Add new ${singularName}`}>
                      <Button
                        size="sm"
                        isIconOnly
                        startContent={<FaPlus />}
                        onPress={addDisclosure.onOpen}
                      />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                  {DeleteModal ? (
                    <Tooltip showArrow content={`Delete ${singularName}`}>
                      <Button
                        size="sm"
                        isIconOnly
                        startContent={<FaTrash />}
                        onPress={deleteDisclosure.onOpen}
                      />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </div>
              );
            } else {
              return <div className=""></div>;
            }
          },
        }}
        data={data}
        onPublish={async (data: Data) => {
          const db = getFirestore(firebase_app);

          if (checkError) {
            const validationError = checkError(data);
            if (validationError) {
              message.setError(validationError);
              return;
            }
            message.setInfo("Publishing");
          }
          try {
            await setDoc(doc(db, collection, path), data);
            await setDoc(
              doc(db, "records", collection),
              {
                [path]: data.root.props?.title || "Untitled",
              },
              { merge: true }
            );
            auth.currentUser
              ?.getIdToken()
              .then((token) =>
                fetch(
                  `/api/revalidate?path=${path?.replace(
                    "homepage",
                    ""
                  )}&token=${token}`
                )
              );
            message.setSuccess(`${singularName} published successfully`);
          } catch (e) {
            console.error(e);
            message.setError(
              `Error publishing ${singularName}: ${(e as any).code}`
            );
          }
        }}
      />
      {CreateNewModal ? (
        <CreateNewModal disclosure={addDisclosure}></CreateNewModal>
      ) : (
        ""
      )}
      {DeleteModal ? (
        <DeleteModal path={path} disclosure={deleteDisclosure}></DeleteModal>
      ) : (
        ""
      )}
    </>
  );
}
