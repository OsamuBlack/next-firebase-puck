"use client";

import Modal from "@/components/modal";
import { useMessage } from "@/lib/messageProvider";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  deleteDoc,
  deleteField,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function DeleteModal({
  path,
  singularName,
  collection,
  disclosure,
}: {
  path: string;
  singularName: string;
  collection: string;
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const db = getFirestore();
  const message = useMessage();
  const router = useRouter();
  const lowerCaseSingular = singularName.toLowerCase();

  return (
    <Modal
      header={"Delete " + lowerCaseSingular}
      disclosure={disclosure}
      Actions={
        <Button
          color="primary"
          onPress={async () => {
            message.setInfo("Deleting...");
            try {
              disclosure.onClose();
              await deleteDoc(doc(db, collection, path));
              message.setSuccess(singularName + " Deleted Successfully");
              await setDoc(
                doc(db, "records", collection),
                {
                  [path]: deleteField(),
                },
                { merge: true }
              );
              router.push("/");
            } catch (error) {
              message.setInfo(
                `Error deleting the ${lowerCaseSingular}: ${
                  (error as any).code
                }`
              );
            }
          }}
        >
          Delete
        </Button>
      }
    >
      Procede to delete this {lowerCaseSingular}? Once you do it cannot be
      recovered.
    </Modal>
  );
}
