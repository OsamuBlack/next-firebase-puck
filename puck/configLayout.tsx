import type { Config } from "@measured/puck";
import { Header, HeaderProps } from "./component/header/config";
import {
  defaultMetadata,
  metadataFields,
  MetadataProps,
} from "./helperComponents/metadata";

type Props = {
  Header: HeaderProps;
  Content: {};
};

type RootProps = MetadataProps;

export const config: Config<Props, RootProps> = {
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
    fields: metadataFields,
    defaultProps: defaultMetadata,
  },
};

export default config;
