import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { Table } from "@src/common/table/Table";
import { Md } from "@src/common/txt/Md";
import { JapaneseSettings } from "@src/japanese/japanese-sitemap";
import { KanaTable } from "@src/japanese/kana-table/KanaTable";
import { VerbColors } from "@src/japanese/systems/verbs/VerbsOverview";
import { KanaUtils } from "@src/japanese/utils/kana-utils";

export function VerbPresentForm() {
  return (
    <ContentBox>
      <h1>Present form</h1>
      <p>
        The present form of a verb is used to describe actions that are
        currently happening or in some cases will happen in the future.
      </p>
      <p>
        They typically consist of the stem of the word, and an ending in the
        U-column of the Kana table:
      </p>
      <KanaTable
        style={{ fontSize: 5, maxWidth: 200, padding: 24 }}
        ghostColStyle={(col) => {
          return col === "u" ? { border: "2px solid red" } : undefined;
        }}
      />
      <h2>Keigo conjugation</h2>
      <Table
        data={keigoConjugationTableData}
        rowKey={(row) => row.example}
        cellStyle={({ row }) => ({ color: row.color })}
        columns={[
          { name: "Class", render: (row) => row.class },
          {
            name: "Endings",
            render: (row) => {
              const joined = row.endings.join(" ");

              return (
                <Flex down center>
                  {JapaneseSettings.japanese && (
                    <Md text={KanaUtils.toHiragana(joined)} />
                  )}
                  {JapaneseSettings.romaji && <Md text={joined} />}
                </Flex>
              );
            },
          },
          {
            name: "Transformation",
            render: (row) => (
              <Flex down center>
                {JapaneseSettings.japanese && (
                  <Md text={KanaUtils.toHiragana(row.transformation)} />
                )}
                {JapaneseSettings.romaji && <Md text={row.transformation} />}
              </Flex>
            ),
          },
          {
            name: "Example",
            render: (row) => (
              <Flex down center>
                {JapaneseSettings.japanese && (
                  <Md text={KanaUtils.toHiragana(row.example)} />
                )}
                {JapaneseSettings.romaji && <Md text={row.example} />}
              </Flex>
            ),
          },
          {
            name: "Keigo form",
            render: (row) => (
              <Flex down center>
                {JapaneseSettings.japanese && (
                  <Md text={KanaUtils.toHiragana(row.keigoForm)} />
                )}
                {JapaneseSettings.romaji && <Md text={row.keigoForm} />}
              </Flex>
            ),
          },
        ]}
      />
    </ContentBox>
  );
}

const keigoConjugationTableData: {
  color: string;
  class: React.ReactNode;
  endings: string[];
  transformation: string;
  example: string;
  keigoForm: string;
}[] = [
  {
    color: VerbColors.ichidan,
    class: "Ichidan (一段)",
    endings: ["ru"],
    transformation: "~ru~ → **masu**",
    example: "taberu",
    keigoForm: "tabe~ru~**masu**",
  },
  {
    color: VerbColors.godan,
    class: "Godan (五段)",
    endings: ["u", "ku", "gu", "su", "tsu", "nu", "bu", "mu", "ru"],
    transformation: "~u♫~ → **i♫ + masu**",
    example: "kaku",
    keigoForm: "ka~ku~**kimasu**",
  },
  {
    color: VerbColors.irregular,
    class: "Irregular",
    endings: [""],
    transformation: "",
    example: "suru",
    keigoForm: "shimasu",
  },
  {
    color: VerbColors.irregular,
    class: "Irregular",
    endings: [""],
    transformation: "",
    example: "kuru",
    keigoForm: "kimasu",
  },
];
