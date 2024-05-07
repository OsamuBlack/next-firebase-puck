"use client";

import Modal from "@/components/modal";
import firebase_app from "@/lib/firebase";
import { useMessage } from "@/lib/messageProvider";
import { Data } from "@measured/puck";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export default function CreateNewModal({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const db = getFirestore(firebase_app);
  const message = useMessage();
  return (
    <Modal
      header="Create New Template"
      disclosure={disclosure as any}
      Actions={
        <Button
          color="primary"
          onPress={async () => {
            disclosure.onClose();
            message.setInfo("Creating...");
            const data: Data = {
              root: {
                props: {
                  title: "New Template",
                },
              },
              content: [],
              zones: {},
            };
            try {
              disclosure.onClose();
              const response = await addDoc(collection(db, "templates"), data);
              if (response.id) {
                message.setSuccess("Template Created Successfully");
                await setDoc(
                  doc(db, "records", "templates"),
                  {
                    [response.id]: data.root.props?.title,
                  },
                  { merge: true }
                );
                window
                  .open("/" + response.id + "/editTemplate", "_blank")
                  ?.focus();
              }
            } catch (error) {
              message.setInfo(
                "Error creating the layout: " + (error as any).code
              );
            }
          }}
        >
          Create Template
        </Button>
      }
    >
      Procede to create a new template?
    </Modal>
  );
}
