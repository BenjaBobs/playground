import { SystemsOverview } from "@src/japanese/systems/SystemsOverview";
import { KanaTablePage } from "@src/japanese/kana-table/KanaTable";
import { RouteDefinition } from "@src/sitemap";

export const JapaneseSiteMap = {
  menu: { name: "Japanese" },
  nested: {
    kana: {
      menu: { name: "Kana table" },
      element: <KanaTablePage />,
    },
    systems: {
      menu: { name: "Systems" },
      element: <SystemsOverview />,
    },
  },
} satisfies RouteDefinition;
