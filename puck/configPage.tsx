import type { Config } from "@measured/puck";
import { Header, HeaderProps } from "./component/header/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import CardsSection, { CardsSectionProps } from "./component/cardsSection";
import { ImageSection, ImageSectionProps } from "./component/imageSection";
import {
  defaultMetadata,
  metadataFields,
  MetadataProps,
} from "./helperComponents/metadata";

type Props = {
  Header: HeaderProps;
  Cards: CardsSectionProps;
  Hero: ImageSectionProps;
};

export const config: Config<Props, MetadataProps> = {
  components: {
    Header: Header,
    Cards: CardsSection,
    Hero: ImageSection,
  },
  root: {
    fields: metadataFields,
    defaultProps: defaultMetadata,
  },
};

export default config;
