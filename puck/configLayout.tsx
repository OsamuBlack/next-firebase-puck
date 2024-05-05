import type { Config } from "@measured/puck";
import { Header, HeaderProps } from "./component/header/config";

type Props = {
  Header: HeaderProps;
  Content: {};
};

export const config: Config<Props> = {
  components: {
    Header: Header,
    Content: {
      render: () => (
        <div className="w-screen h-96 flex justify-center items-center">
          <span className="text-2xl font-bold">Content will go here</span>
        </div>
      ),
    },
  },
  root: {
    fields: {
      title: {
        type: "text",
        label: "Title",
      },
      icon: {
        type: "object",
        objectFields: {
          light: {
            type: "text",
            label: "dark",
          },
          dark: {
            type: "text",
            label: "dark",
          },
        },
        label: "Tab Icons",
      },
    },
    defaultProps: {
      title: "Root Layout",
    },
  },
};

export default config;
