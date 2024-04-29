import type { Config } from "@measured/puck";
import { Button } from "@nextui-org/react";

type Props = {
  HeadingBlock: { title: string };
  Button: { text: string };
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    Button: {
      fields: {
        text: { type: "text" },
      },
      defaultProps: {
        text: "Button",
      },
      render: ({ text }) => <Button style={{ padding: 16 }}>{text}</Button>,
    },
  },
};

export default config;
