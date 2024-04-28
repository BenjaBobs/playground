import { KanaTablePage } from "@src/japanese/kana-table/KanaTable";
import { RouteDefinition } from "@src/sitemap";
import { VerbTeForm } from "@src/japanese/systems/verbs/forms/VerbTeForm";
import { SystemsOverview } from "@src/japanese/systems/SystemsOverview";
import { VerbsOverview } from "@src/japanese/systems/verbs/VerbsOverview";
import { proxy } from "valtio";
import { VerbPresentForm } from "@src/japanese/systems/verbs/forms/VerbPresentForm";
import "@src/japanese/japanese-style.scss";

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
            presentForm: {
              menu: { name: "Present form" },
              element: <VerbPresentForm />,
            },
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

export const JapaneseSettings = proxy({
  japanese: true,
  romaji: true,
  keigo: true,
  casual: true,
});
