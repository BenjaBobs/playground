import { KanaTable } from "@src/japanese/KanaTable";
import { RouteDefinition } from "@src/sitemap";

export const JapaneseSiteMap = {
  menu: { name: "Japanese" },
  nested: {
    kana: {
      menu: { name: "Kana table" },
      element: <KanaTable />,
    },
    wat: {
      menu: { name: "Wat" },
      element: <div>Wat</div>,
    },
  },
} satisfies RouteDefinition;
