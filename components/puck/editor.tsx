"use client";

import { debounce, isEqual } from "lodash";
import type { Config, Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app, { auth } from "@/lib/firebase";
import { useMessage } from "@/lib/messageProvider";
import MessageScreen from "@/components/messageScreen";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Dropdown from "./dropdown";

export function Editor({
  path,
  data,
  checkError,
  records,
  collection,
  singularName,
  name,
  CreateNewModal,
  DeleteModal,
  revaildateRoute,
  config,
  Action,
}: {
  path: string;
  data: Data;
  checkError?: (data: Data) => false | string;
  records?: {
    key: string;
    path: string;
    label: string;
  }[];
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
    collection,
  }: {
    path: string;
    disclosure: ReturnType<typeof useDisclosure>;
    collection: string;
    singularName: string;
  }) => React.ReactNode;
  revaildateRoute?: string;
  config: Config;
  Action?: (unsaved: boolean) => React.ReactNode;
}) {
  const message = useMessage();
  const router = useRouter();
  const addDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const [unsaved, setUnsaved] = useState(false);
  const [defaultData, setDefaultData] = useState(data);

  const checkDataChange = debounce((newData) => {
    if (!isEqual(defaultData, newData)) {
      setDefaultData(newData);
      setUnsaved(true);
    } else {
      setUnsaved(false);
    }
  }, 2500);

  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (unsaved) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? All unsaved changes will be lost.";
      }
    };

    window.addEventListener("beforeunload", handleWindowClose);
    window.addEventListener("popstate", handleWindowClose);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  if (!data)
    return <MessageScreen message="Error loading the data" color="danger" />;
  return (
    <>
      <Puck
        config={config as Config}
        overrides={{
          headerActions: (props) => {
            return (
              <div className="flex gap-4 justify-center items-center">
                {Action ? Action(unsaved) : ""}
                <Dropdown
                  name={name}
                  buttonText={"Select " + singularName}
                  path={path}
                  items={records || []}
                  unsaved={unsaved}
                />
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
            if (records)
              await setDoc(
                doc(db, "records", collection),
                {
                  [path]: data.root.props?.title || "Untitled",
                },
                { merge: true }
              );
            setUnsaved(false);
            setDefaultData(data);
            if (revaildateRoute)
              auth.currentUser?.getIdToken().then((token) =>
                fetch(revaildateRoute, {
                  method: "POST",
                  body: JSON.stringify({
                    path: path,
                    token: token,
                  }),
                })
              );
            message.setSuccess(`${singularName} published successfully`);
          } catch (e) {
            console.error(e);
            message.setError(
              `Error publishing ${singularName}: ${(e as any).code}`
            );
          }
        }}
        onChange={checkDataChange}
      />
      {CreateNewModal ? (
        <CreateNewModal disclosure={addDisclosure}></CreateNewModal>
      ) : (
        ""
      )}
      {DeleteModal ? (
        <DeleteModal
          path={path}
          disclosure={deleteDisclosure}
          collection={collection}
          singularName={singularName}
        ></DeleteModal>
      ) : (
        ""
      )}
    </>
  );
}
