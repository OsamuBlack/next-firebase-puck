import React from "react";
import { ImageType } from "@/puck/helperComponents/image";
import { ComponentConfig } from "@measured/puck";
import CardsSectionRender from "./cardRender";
import {
  defaultSectionProps,
  SectionFields,
  SectionProps,
} from "@/components/section";
import { LinkType } from "../helperComponents/link";

type Card = {
  icon: ImageType;
  cta: LinkType;
  title: string;
  description: string;
};

export type CardsSectionProps = {
  title: string;
  description: string;
  cards: Card[];
  section: SectionProps;
};

const CardsSection: Omit<ComponentConfig<CardsSectionProps>, "type"> = {
  fields: {
    title: { label: "Title", type: "text" },
    description: { label: "Description", type: "text" },
    section: SectionFields,
    cards: {
      type: "array",
      label: "Cards",
      defaultItemProps: {
        icon: {
          src: "",
          alt: "",
          width: 48,
          height: 48,
        },
        cta: {
          text: "",
          href: "",
          target: "_blank",
        },
        title: "Title",
        description: "Description",
      },
      getItemSummary(item, index) {
        return item.title;
      },
      arrayFields: {
        icon: {
          type: "object",
          objectFields: {
            src: { type: "text" },
            alt: { type: "text" },
            width: { type: "number" },
            height: { type: "number" },
          },
        },
        title: { type: "text" },
        description: { type: "text" },
        cta: {
          type: "object",
          objectFields: {
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
      },
    },
  },
  defaultProps: {
    title: "Title",
    description: "Description",
    section: defaultSectionProps,
    cards: [
      {
        icon: {
          src: "",
          alt: "",
          width: 48,
          height: 48,
        },
        cta: {
          text: "",
          href: "",
          target: "_blank",
        },
        title: "Title",
        description: "Description",
      },
    ],
  },
  render: (props) => (
    <CardsSectionRender
      title={props.title}
      description={props.description}
      section={props.section}
      cards={props.cards}
    />
  ),
};

export default CardsSection;
