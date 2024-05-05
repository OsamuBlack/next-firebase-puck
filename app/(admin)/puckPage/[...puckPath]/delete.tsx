"use client";

import Modal from "@/components/modal";
import { useMessage } from "@/lib/messageProvider";
import { Data } from "@measured/puck";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function DeleteModal({
  path,
  disclosure,
}: {
  path: string;
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const db = getFirestore();
  const message = useMessage();
  const router = useRouter();
  return (
    <Modal
      header={"Delete Page"}
      disclosure={disclosure}
      Actions={
        <Button
          color="primary"
          onPress={async () => {
            message.setInfo("Deleting...");
            const data: Data = {
              root: {
                props: {
                  title: "New Page",
                },
              },
              content: [],
              zones: {},
            };
            try {
              disclosure.onClose();
              await deleteDoc(doc(db, "pages", path));
              message.setSuccess("Page Deleted Successfully");
              await setDoc(
                doc(db, "records", "pages"),
                {
                  [path]: deleteField(),
                },
                { merge: true }
              );
              router.push("/default/editPage");
            } catch (error) {
              message.setInfo(
                "Error deleting the layout: " + (error as any).code
              );
            }
          }}
        >
          Delete
        </Button>
      }
    >
      Procede to delete this layout? Once you do it cannot be recovered.
    </Modal>
  );
}