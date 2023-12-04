import { ContentBox } from "@src/common/context-box/ContextBox";
import { ConjugationOverview } from "@src/japanese/conjugations/ConjugationOverview";
import { KanaTable } from "@src/japanese/kana-table/KanaTable";
import { RouteDefinition } from "@src/sitemap";

export const JapaneseSiteMap = {
  menu: { name: "Japanese" },
  nested: {
    kana: {
      menu: { name: "Kana table" },
      element: (
        <ContentBox>
          <KanaTable />
        </ContentBox>
      ),
    },
    conjugations: {
      menu: { name: "Conjugations" },
      element: <ConjugationOverview />,
    },
  },
} satisfies RouteDefinition;
