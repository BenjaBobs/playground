import { KanaTablePage } from "@src/japanese/kana-table/KanaTable";
import { RouteDefinition } from "src/shared/navigation/sitemap";
import { VerbTeForm } from "@src/japanese/systems/verbs/forms/VerbTeForm";
import { SystemsOverview } from "@src/japanese/systems/SystemsOverview";
import { VerbsOverview } from "@src/japanese/systems/verbs/VerbsOverview";
import { VerbPresentForm } from "@src/japanese/systems/verbs/forms/VerbPresentForm";
import "@src/japanese/japanese-style.scss";
import { Flex } from "@src/common/flex/flex";
import { Dropdown } from "@src/common/windows/dropdown/Dropdown";
import { CheckBox } from "@src/common/input/checkbox/CheckBox";
import { makeAutoObservable, runInAction } from "mobx";
import { AdjectivesOverview } from "@src/japanese/systems/adjectives/AdjectivesOverview";

export const JapaneseSettings = makeAutoObservable({
  japanese: true,
  hiragana: true,
  katakana: true,
  romaji: true,
  keigo: true,
  casual: true,
});

export const JapaneseSiteMap = {
  menu: {
    name: (
      <Flex gap={8} justify="between">
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
        adjectives: {
          menu: { name: "Adjectives" },
          element: <AdjectivesOverview />,
        },
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
  return (
    <Flex down bg="white" pad={8} border="1px solid black">
      <h3>Settings</h3>
      <Flex center gap={40}>
        <Flex down>
          <CheckBox
            checked={JapaneseSettings.japanese}
            onChange={(value) =>
              runInAction(() => (JapaneseSettings.japanese = value))
            }
          >
            Japanese
          </CheckBox>
          <CheckBox
            checked={JapaneseSettings.hiragana}
            onChange={(value) => (JapaneseSettings.hiragana = value)}
          >
            Hiragana
          </CheckBox>
          <CheckBox
            checked={JapaneseSettings.katakana}
            onChange={(value) => (JapaneseSettings.katakana = value)}
          >
            Katakana
          </CheckBox>
          <CheckBox
            checked={JapaneseSettings.romaji}
            onChange={(value) => (JapaneseSettings.romaji = value)}
          >
            Romaji
          </CheckBox>
        </Flex>
        <Flex down>
          <CheckBox
            checked={JapaneseSettings.casual}
            onChange={(value) => (JapaneseSettings.casual = value)}
          >
            Casual
          </CheckBox>
          <CheckBox
            checked={JapaneseSettings.keigo}
            onChange={(value) => (JapaneseSettings.keigo = value)}
          >
            Keigo
          </CheckBox>
        </Flex>
      </Flex>
    </Flex>
  );
}
