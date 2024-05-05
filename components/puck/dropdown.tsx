"use client";

import { useMessage } from "@/lib/messageProvider";
import {
  Button,
  Dropdown as DropdownNextUI,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Dropdown({
  name,
  buttonText,
  path,
  items,
  unsaved,
}: {
  name: string;
  buttonText: string;
  path: string;
  items: { key: string; path: string; label: string }[];
  unsaved?: boolean;
}) {
  if (!items.length) {
    return undefined;
  }
  const router = useRouter();
  const message = useMessage();
  return (
    <DropdownNextUI>
      <DropdownTrigger>
        <Button size="sm">{buttonText}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" disabledKeys={["", path]}>
        {items?.length ? (
          items.map(({ key, path, label }) => (
            <DropdownItem
              key={key}
              onClick={() => {
                if (
                  unsaved == false ||
                  (unsaved &&
                    window.confirm(
                      "Are you sure you want to leave? All unsaved changes will be reverted!"
                    ))
                ) {
                  router.push(path);
                  message.setInfo(`Loading...`);
                }
              }}
            >
              {label}
            </DropdownItem>
          ))
        ) : (
          <DropdownItem key="">No {name} found</DropdownItem>
        )}
      </DropdownMenu>
    </DropdownNextUI>
  );
}
