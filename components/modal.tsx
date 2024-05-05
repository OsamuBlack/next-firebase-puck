import React from "react";
import {
  Modal as UiModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Modal({
  header,
  children,
  Actions,
  disclosure,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
  Actions: React.ReactNode;
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const { isOpen, onOpenChange, onOpen } = disclosure;

  return (
    <UiModal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            {header ? (
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
            ) : (
              ""
            )}
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              {Actions}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </UiModal>
  );
}
