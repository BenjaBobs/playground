import { KanaTablePage } from "@src/japanese/kana-table/KanaTable";
import { RouteDefinition } from "@src/sitemap";
import { VerbTeForm } from "@src/japanese/systems/verbs/forms/VerbTeForm";

export const JapaneseSiteMap = {
  menu: { name: "Japanese" },
  nested: {
    kana: {
      menu: { name: "Kana table" },
      element: <KanaTablePage />,
    },
    systems: {
      menu: { name: "Systems" },
      element: <div>Systems</div>,
      nested: {
        verbs: {
          menu: { name: "Verbs" },
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
