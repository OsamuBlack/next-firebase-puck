"use client";

import Modal from "@/components/modal";
import { useMessage } from "@/lib/messageProvider";
import { isValidURI } from "@/lib/utilities/validations";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNewModal({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const router = useRouter();
  const message = useMessage();
  const [path, setPath] = useState("");
  const [error, setError] = useState(false);
  return (
    <Modal
      header="Create New Page"
      disclosure={disclosure as any}
      Actions={
        <Button
          color="primary"
          onPress={() => {
            disclosure.onClose();
          }}
          isDisabled={!path || error}
        >
          <Link href={path + "/editPage"} target="_blank">
            Go to page
          </Link>
        </Button>
      }
    >
      <Input
        autoFocus
        label="URI"
        placeholder="Enter the path of the formate /page/..."
        variant="bordered"
        value={path}
        errorMessage={"Invalid URL format"}
        isInvalid={error}
        onValueChange={(e) => {
          setPath(e);
          if (!isValidURI(e)) {
            setError(true);
          } else {
            setError(false);
          }
        }}
      />
    </Modal>
  );
}
