import { ComponentConfig } from "@measured/puck";
import ImageSectionRender from "./imageSectionRender";
import {
  defaultSectionProps,
  SectionFields,
  SectionProps,
} from "@/components/section";

export type ImageSectionProps = {
  image: {
    src: string;
    alt: string;
    priority?: boolean;
  };
  title: string;
  description: string;
  section: SectionProps;
  layout: "left-image" | "right-image";
  cta: {
    text: string;
    href: string;
    target: string;
  };
};

export const ImageSection: Omit<ComponentConfig<ImageSectionProps>, "type"> = {
  fields: {
    title: { label: "Title", type: "text" },
    description: { label: "Description", type: "text" },
    layout: {
      type: "radio",
      label: "Layout",
      options: [
        {
          label: "Left Image",
          value: "left-image",
        },
        {
          label: "Right Image",
          value: "right-image",
        },
      ],
    },
    section: SectionFields,
    image: {
      type: "object",
      label: "Image",
      objectFields: {
        src: { type: "text" },
        alt: { type: "text" },
        priority: {
          type: "radio",
          label: "Priority",
          options: [
            {
              label: "Yes",
              value: true,
            },
            {
              label: "No",
              value: false,
            },
          ],
        },
      },
    },
    cta: {
      type: "object",
      label: "Call to Action",
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
  defaultProps: {
    image: {
      src: "",
      alt: "",
    },
    section: defaultSectionProps,
    title: "Title",
    description: "Description",
    layout: "left-image",
    cta: {
      text: "",
      href: "",
      target: "_blank",
    },
  },
  render: ({ image, title, description, section, layout, cta }) => (
    <ImageSectionRender
      image={image}
      title={title}
      section={section}
      description={description}
      layout={layout}
      cta={cta}
    />
  ),
};
