"use client";

import type { Config } from "@measured/puck";
import { Header, HeaderProps } from "./component/header/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import CardsSection, { CardsSectionProps } from "./component/cardsSection";
import { ImageSection, ImageSectionProps } from "./component/imageSection";

type Props = {
  Header: HeaderProps;
  Cards: CardsSectionProps;
  Hero: ImageSectionProps;
};

export const config: Config<Props> = {
  components: {
    Header: Header,
    Cards: CardsSection,
    Hero: ImageSection,
  },
  root: {
    fields: {
      title: {
        type: "text",
        label: "Title",
      },
      layout: {
        type: "external",
        label: "Layout",
        fetchList: async () => {
          const db = getFirestore();
          const layouts = await getDocs(collection(db, "layouts"));
          return layouts.docs.map((doc) => ({
            value: doc.id,
            label: doc.data().root.props.title,
          }));
        },
        placeholder: "Select a layout",
        getItemSummary: (item) => item.label,
      },
    },
    defaultProps: {
      title: "New",
    },
  },
};

export default config;
