import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { useDevice } from "@src/common/hooks/useDeviceSize";
import { Table } from "@src/common/table/Table";
import { Md } from "@src/common/txt/Md";
import { JapaneseSettings } from "@src/japanese/japanese-sitemap";

export const AdjectiveColors = {
  i: "oklch(0.5 0.1 150)",
  na: "oklch(0.5 0.1 250)",
} as const;

export function AdjectivesOverview() {
  const device = useDevice();

  return (
    <ContentBox>
      <h1>Adjective types</h1>
      <Table<{
        type: string;
        color: string;
        description: string;
        example: string;
      }>
        rowKey={(row) => row.type}
        columns={[
          { name: "Name", render: (row) => row.type },
          { name: "Description", render: (row) => row.description },
          { name: "Example", render: (row) => row.example },
        ]}
        cellStyle={(cell) => !cell.isHeader && { color: cell.row.color }}
        style={{ maxWidth: "600px" }}
        data={[
          {
            type: "い (i) adjective",
            color: AdjectiveColors.i,
            description: "い-adjectives always end in い (i).",
            example: "たかい (takai) - high, tall",
          },
          {
            type: "な (na) adjective",
            color: AdjectiveColors.na,
            description:
              "な-adjectives mostly end in other kana than い, but some exceptions exist.",
            example: "げんき (genki) - healthy",
          },
        ]}
      />
      <h1>Usage</h1>
      <p>Adjectives are used to describe nouns.</p>
      <Table
        rowKey={(row) => row.type}
        cellStyle={(cell) => !cell.isHeader && { color: cell.row.color }}
        columns={[
          {
            name: "Type",
            render: (row) => <Md text={row.type} />,
          },
          {
            name: "Example",
            render: (row) => (
              <Flex down>
                <Md text={row.example.romaji} />
              </Flex>
            ),
          },
        ]}
        data={[
          {
            type: "**い** (i) adjective",
            color: AdjectiveColors.i,
            example: {
              hiragana: "**たかい**",
              romaji: "**takai**",
            },
          },
          {
            type: "**い** (i) adjective + noun",
            color: AdjectiveColors.i,
            example: {
              hiragana: "**たかい** やま",
              romaji: "**takai** yama",
            },
          },
          {
            type: "Noun + **い** (i) adjective",
            color: AdjectiveColors.i,
            example: {
              hiragana: "やま が **たかい**",
              romaji: "yama ga **takai**",
            },
          },
          {
            type: "**な** (na) adjective",
            color: AdjectiveColors.na,
            example: {
              hiragana: "**げんき**",
              romaji: "**genki**",
            },
          },
          {
            type: "**な** (na) adjective + noun",
            color: AdjectiveColors.na,
            example: {
              hiragana: "**げんきな** ひと",
              romaji: "**genki na** hito",
            },
          },
          {
            type: "Noun + **な** (na) adjective",
            color: AdjectiveColors.na,
            example: {
              hiragana: "ひと が **げんきな**",
              romaji: "hito ga **genki**",
            },
          },
        ]}
      />
      <h1>Conjugations</h1>
      <Table
        rowKey={(row) => row.form}
        columns={[
          {
            name: "Form",
            width: device === "mobile" ? "20vw" : undefined,
            render: (row) => (
              <Flex down>
                <b>
                  <Md text={row.form} />
                </b>
                <i>
                  <Md text={row.description} />
                </i>
              </Flex>
            ),
          },
          {
            name: "い",
            render: (row) => (
              <Flex down>
                {JapaneseSettings.hiragana && JapaneseSettings.casual && (
                  <Md text={row.i.hiragana} />
                )}
                {JapaneseSettings.romaji && JapaneseSettings.casual && (
                  <Md text={row.i.romaji} />
                )}
                {JapaneseSettings.hiragana && JapaneseSettings.keigo && (
                  <Md text={row.i.hiraganaKeigo} />
                )}
                {JapaneseSettings.romaji && JapaneseSettings.keigo && (
                  <Md text={row.i.romajiKeigo} />
                )}
              </Flex>
            ),
          },
          {
            name: "な",
            render: (row) => (
              <Flex down>
                {JapaneseSettings.hiragana && JapaneseSettings.casual && (
                  <Md text={row.na.hiragana} />
                )}
                {JapaneseSettings.romaji && JapaneseSettings.casual && (
                  <Md text={row.na.romaji} />
                )}
                {JapaneseSettings.hiragana && JapaneseSettings.keigo && (
                  <Md text={row.na.hiraganaKeigo} />
                )}
                {JapaneseSettings.romaji && JapaneseSettings.keigo && (
                  <Md text={row.na.romajiKeigo} />
                )}
              </Flex>
            ),
          },
        ]}
        cellStyle={({ column }) => {
          return {
            borderBottom: "1px solid rgba(0,0,0, 0.1)",
            color:
              column.name === "い"
                ? AdjectiveColors.i
                : column.name === "な"
                ? AdjectiveColors.na
                : undefined,
          };
        }}
        data={[
          {
            form: "Present positive",
            description: "The basic form of the adjective.",
            i: {
              hiragana: "たか**い**",
              romaji: "taka**i**",
              hiraganaKeigo: "たか**いです**",
              romajiKeigo: "taka**i desu**",
            },
            na: {
              hiragana: "げん**き**",
              romaji: "gen**ki**",
              hiraganaKeigo: "げん**きです**",
              romajiKeigo: "gen**ki desu**",
            },
          },
          {
            form: "Present negative",
            description: "The negated (not-) form of the adjective.",
            i: {
              hiragana: "たか**くない**",
              romaji: "taka**kunai**",
              hiraganaKeigo: "たか**くないです**",
              romajiKeigo: "taka**kunai desu**",
            },
            na: {
              hiragana: "げんき**じゃない**",
              romaji: "genki**janai**",
              hiraganaKeigo: "げんき**ではありません**",
              romajiKeigo: "genki **deha arimasen**",
            },
          },
          {
            form: "Past positive",
            description: "Past version of the adjective.",
            i: {
              hiragana: "たか**かった**",
              romaji: "taka**katta**",
              hiraganaKeigo: "たか**かったです**",
              romajiKeigo: "taka**katta desu**",
            },
            na: {
              hiragana: "げんき**だった**",
              romaji: "genki**datta**",
              hiraganaKeigo: "げんき**でした**",
              romajiKeigo: "genki**deshita**",
            },
          },
          {
            form: "Past negative",
            description: "Past negated (not-) version of the adjective.",
            i: {
              hiragana: "たか**くなかった**",
              romaji: "taka**kunakatta**",
              hiraganaKeigo: "たか**くありませんでした**",
              romajiKeigo: "taka**ku arimasen deshita**",
            },
            na: {
              hiragana: "げんき**じゃなかった**",
              romaji: "genki**janakatta**",
              hiraganaKeigo: "げんき**ではありませんでした**",
              romajiKeigo: "genki **deha arimasen deshita**",
            },
          },
          {
            form: "Te-form",
            description: "Used when connecting adjectives.",
            i: {
              hiragana: "たか**くて**",
              romaji: "taka**kute**",
            },
            na: {
              hiragana: "げんき**で**",
              romaji: "genki**de**",
            },
          },
          {
            form: "Adverbial form",
            description:
              "Used when the adjective should describe a _verb_ rather than a _noun_.",
            i: {
              hiragana: "たか**く**",
              romaji: "taka**ku**",
            },
            na: {
              hiragana: "げんき**に**",
              romaji: "genki**ni**",
            },
          },
        ]}
      />
    </ContentBox>
  );
}
