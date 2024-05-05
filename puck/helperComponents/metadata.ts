import { Fields } from "@measured/puck";

export type MetadataProps = {
  title: string;
  description: string;
  canonical: string;
  icon: {
    light: string;
    dark: string;
  };
  robot: {
    index: boolean;
    follow: boolean;
  };
  ogImages: {
    width: number;
    height: number;
    alt: string;
    url: string;
  }[];
  twitter: {
    card: string;
    creator: string;
  };
};

export const metadataFields: Fields<MetadataProps> = {
  title: {
    type: "text",
    label: "Title",
  },
  description: {
    type: "textarea",
    label: "Description",
  },
  canonical: {
    type: "text",
    label: "Canonical URL",
  },
  icon: {
    type: "object",
    objectFields: {
      light: {
        type: "text",
        label: "Light",
      },
      dark: {
        type: "text",
        label: "Dark",
      },
    },
    label: "Tab Icons",
  },
  robot: {
    label: "Bot Settings",
    type: "object",
    objectFields: {
      index: {
        type: "radio",
        options: [
          {
            label: "Index",
            value: true,
          },
          {
            label: "No Index",
            value: false,
          },
        ],
      },
      follow: {
        type: "radio",
        options: [
          {
            label: "Follow",
            value: true,
          },
          {
            label: "No Follow",
            value: false,
          },
        ],
      },
    },
  },
  ogImages: {
    type: "array",
    arrayFields: {
      width: {
        type: "number",
        label: "Width",
      },
      height: {
        type: "number",
        label: "Height",
      },
      alt: {
        type: "text",
        label: "Alt Text",
      },
      url: {
        type: "text",
        label: "URL",
      },
    },
    defaultItemProps: {
      width: 1200,
      height: 630,
      alt: "Open Graph Image",
      url: "",
    },
    label: "Open Graph & Twitter Images",
  },
  twitter: {
    type: "object",
    objectFields: {
      card: {
        type: "text",
        label: "Card Type",
      },
      creator: {
        type: "text",
        label: "Creator",
      },
    },
    label: "Twitter Settings",
  },
};

export const defaultMetadata = {
  title: "Site Title",
  description: "This is meta description",
  canonical: "",
  icon: {
    light: "",
    dark: "",
  },
  robot: {
    index: true,
    follow: true,
  },
  ogImages: [],
  twitter: {
    card: "summary_large_image",
    creator: "",
  },
};
