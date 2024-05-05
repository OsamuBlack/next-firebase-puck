"use client"

import Modal from "@/components/modal";
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
import { useRouter } from "next/navigation";

export default function CreateNewModal({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const db = getFirestore();
  const message = useMessage();
  const router = useRouter();
  return (
    <Modal
      header={"Create Layout"}
      disclosure={disclosure}
      Actions={
        <Button
          color="primary"
          onPress={async () => {
            message.setInfo("Creating...");
            const data: Data = {
              root: {
                props: {
                  title: "New Layout",
                },
              },
              content: [],
              zones: {},
            };
            try {
              disclosure.onClose();
              const response = await addDoc(collection(db, "layouts"), data);
              if (response.id) {
                message.setSuccess("Layout Created Successfully");
                await setDoc(
                  doc(db, "records", "layouts"),
                  {
                    [response.id]: data.root.props?.title || "Untitled",
                  },
                  { merge: true }
                );
                router.push("/" + response.id + "/editLayout");
              }
            } catch (error) {
              message.setInfo(
                "Error creating the layout: " + (error as any).code
              );
            }
          }}
        >
          Create
        </Button>
      }
    >
      Procede to create a new layout?
    </Modal>
  );
}
