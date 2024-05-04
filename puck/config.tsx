import type { Config } from "@measured/puck";
import { Header, HeaderProps } from "./component/header/config";

type Props = {
  Header: HeaderProps;
  // Form: FormProps
};

export const config: Config<Props> = {
  components: {
    Header: Header,
    // Form: Form
  },
  root: {
    fields: {
      title: {
        type: "text",
        label: "Title",
      },
    },
    defaultProps: {
      title: "New",
    },
  },
};

export default config;
