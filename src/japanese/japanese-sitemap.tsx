import { KanaTablePage } from "@src/japanese/kana-table/KanaTable";
import { RouteDefinition } from "@src/sitemap";
import { VerbTeForm } from "@src/japanese/systems/verbs/forms/VerbTeForm";
import { SystemsOverview } from "@src/japanese/systems/SystemsOverview";
import { VerbsOverview } from "@src/japanese/systems/verbs/VerbsOverview";
import { proxy, useSnapshot } from "valtio";
import { VerbPresentForm } from "@src/japanese/systems/verbs/forms/VerbPresentForm";
import "@src/japanese/japanese-style.scss";
import { Flex } from "@src/common/flex/flex";
import { Dropdown } from "@src/common/windows/dropdown/Dropdown";
import { CheckBox } from "@src/common/input/checkbox/CheckBox";

export const JapaneseSiteMap = {
  menu: {
    name: (
      <Flex gap={8} justify="space-around">
        <span>Japanese</span>
      </Flex>
    ),
    extra: (
      <Dropdown trigger="click" content={<JapaneseSettingsCard />}>
        <span className="clickable">&#128736;</span>
      </Dropdown>
    ),
  },
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

export function JapaneseSettingsCard() {
  const snap = useSnapshot(JapaneseSettings);

  return (
    <Flex down bg="white" pad={8} border="1px solid black">
      <h3>Settings</h3>
      <Flex center gap={40}>
        <Flex down>
          <CheckBox
            checked={snap.japanese}
            onChange={(value) => (JapaneseSettings.japanese = value)}
          >
            Japanese
          </CheckBox>
          <CheckBox
            checked={snap.hiragana}
            onChange={(value) => (JapaneseSettings.hiragana = value)}
          >
            Hiragana
          </CheckBox>
          <CheckBox
            checked={snap.katakana}
            onChange={(value) => (JapaneseSettings.katakana = value)}
          >
            Katakana
          </CheckBox>
          <CheckBox
            checked={snap.romaji}
            onChange={(value) => (JapaneseSettings.romaji = value)}
          >
            Romaji
          </CheckBox>
        </Flex>
        <Flex down>
          <CheckBox
            checked={snap.casual}
            onChange={(value) => (JapaneseSettings.casual = value)}
          >
            Casual
          </CheckBox>
          <CheckBox
            checked={snap.keigo}
            onChange={(value) => (JapaneseSettings.keigo = value)}
          >
            Keigo
          </CheckBox>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const JapaneseSettings = proxy({
  japanese: true,
  hiragana: true,
  katakana: true,
  romaji: true,
  keigo: true,
  casual: true,
});
