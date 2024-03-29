import { KanaTablePage } from "@src/japanese/kana-table/KanaTable";
import { RouteDefinition } from "@src/sitemap";
import { VerbTeForm } from "@src/japanese/systems/verbs/forms/VerbTeForm";
import { SystemsOverview } from "@src/japanese/systems/SystemsOverview";
import { VerbsOverview } from "@src/japanese/systems/verbs/VerbsOverview";

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
      nested: {
        verbs: {
          menu: { name: "Verbs" },
          element: <VerbsOverview />,
          nested: {
            teForm: {
              menu: { name: "Te form" },
              element: <VerbTeForm />,
            },
          },
        },
      },
    },
  },
} satisfies RouteDefinition;
