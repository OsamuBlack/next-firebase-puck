import { ImageType } from "@/puck/helperComponents/image";
import { LinkType } from "@/puck/helperComponents/link";
import HeaderRender from "./render";
import { ComponentConfig } from "@measured/puck";


export type HeaderProps = {
  logo: ImageType;
  menuItems: LinkType[];
  callToActions: (LinkType & {
    type: "primary" | "secondary";
  })[];
};


export const Header: Omit<ComponentConfig<HeaderProps>, "type"> = {
  fields: {
    logo: {
      label: "Logo",
      type: "object",
      objectFields: {
        src: { type: "text" },
        alt: { type: "text" },
        width: { type: "number" },
        height: { type: "number" },
      },
    },
    menuItems: {
      type: "array",
      label: "Menu Items",
      getItemSummary(item, index) {
        return item.text;
      },
      defaultItemProps: {
        text: "New Menu Item",
        href: "#",
        target: "_blank",
      },
      arrayFields: {
        text: { type: "text" },
        href: { type: "text" },
        target: {
          type: "radio",
          options: [
            {
              label: "Blank",
              value: "_blank",
            },
            {
              label: "Self",
              value: "_self",
            },
          ],
        },
      },
    },
    callToActions: {
      label: "Call to Actions / Buttons",
      type: "array",
      getItemSummary(item, index) {
        return item.text;
      },
      defaultItemProps: {
        text: "New Call to Action",
        href: "#",
        target: "_self",
        type: "primary",
      },
      arrayFields: {
        text: { type: "text" },
        href: { type: "text" },
        target: {
          type: "radio",
          options: [
            {
              label: "Blank",
              value: "_blank",
            },
            {
              label: "Self",
              value: "_self",
            },
          ],
        },
        type: {
          type: "radio",
          options: [
            {
              label: "Primary",
              value: "primary",
            },
            {
              label: "Secondary",
              value: "secondary",
            },
          ],
        },
      },
    },
  },
  defaultProps: {
    logo: {
      src: "",
      alt: "",
      width: 0,
      height: 0,
    },
    menuItems: [],
    callToActions: [],
  },
  render: (props) => (
    <HeaderRender
      logo={props.logo}
      menuItems={props.menuItems}
      callToActions={props.callToActions}
    />
  ),
};
