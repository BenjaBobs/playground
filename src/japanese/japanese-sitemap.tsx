import { ContentBox } from "@src/common/context-box/ContextBox";
import { SystemsOverview } from "@src/japanese/systems/SystemsOverview";
import { KanaTable } from "@src/japanese/kana-table/KanaTable";
import { RouteDefinition } from "@src/sitemap";

export const JapaneseSiteMap = {
  menu: { name: "Japanese" },
  nested: {
    kana: {
      menu: { name: "Kana table" },
      element: (
        <ContentBox>
          <KanaTable noRomaji noKatakana />
        </ContentBox>
      ),
    },
    systems: {
      menu: { name: "Systems" },
      element: <SystemsOverview />,
    },
  },
} satisfies RouteDefinition;
