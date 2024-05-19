import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { useDevice } from "@src/common/hooks/useDeviceSize";
import { Table } from "@src/common/table/Table";
import { Md } from "@src/common/txt/Md";
import { JapaneseSettings } from "@src/japanese/japanese-sitemap";

export const VerbColors = {
  godan: "oklch(0.5 0.1 150)",
  ichidan: "oklch(0.5 0.1 250)",
  irregular: "oklch(0.5 0.1 50)",
} as const;

export function VerbsOverview() {
  const device = useDevice();

  return (
    <ContentBox>
      <h1>Verb types</h1>
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
        cellStyle={(cell) => {
          return !cell.isHeader && { color: cell.row.color };
        }}
        style={{ maxWidth: "600px" }}
        data={[
          {
            type: "Ichidan (一段, Ru-verb)",
            color: VerbColors.ichidan,
            description: "Ichidan verbs are also known as ru-verbs.",
            example: "食べる (taberu) - to eat",
          },
          {
            type: "Godan (五段, U-verb)",
            color: VerbColors.godan,
            description:
              "Godan verbs are the most common type of verb in Japanese. They are also known as u-verbs.",
            example: "話す (hanasu) - to talk",
          },
          {
            type: "Irregular",
            color: VerbColors.irregular,
            description:
              "Irregular verbs are verbs that don't follow the rules of either godan or ichidan verbs.",
            example: "する (suru) - to do",
          },
        ]}
      />
      <h2>
        Forms (currently wrong data, working on it and the overall design)
      </h2>
      <Table<{
        name: string;
        description: string;
        ichidanExample: string;
        ichidanExampleRomaji: string;
        ichidanKeigoExample?: string;
        ichidanKeigoExampleRomaji?: string;
        godanExample: string;
        godanExampleRomaji: string;
        godanKeigoExample?: string;
        godanKeigoExampleRomaji?: string;
        irregularSuru: string;
        irregularSuruRomaji: string;
        irregularKuru: string;
        irregularKuruRomaji: string;
        irregularKeigoSuru?: string;
        irregularKeigoSuruRomaji?: string;
        irregularKeigoKuru?: string;
        irregularKeigoKuruRomaji?: string;
      }>
        rowKey={(row) => row.name}
        cellStyle={({ columnIdx }) => {
          return {
            borderLeft:
              device !== "mobile" && columnIdx !== 0
                ? "1px solid rgba(0,0,0, 0.1)"
                : "none",
            borderBottom: "1px solid rgba(0,0,0, 0.1)",
          };
        }}
        columns={[
          {
            name: "Form",
            width: device === "mobile" ? "20vw" : undefined,
            render: (row) => (
              <Flex down gap={8}>
                <b>{row.name}</b>
                <i>{row.description}</i>
              </Flex>
            ),
          },
          {
            name: (
              <span style={{ color: VerbColors.ichidan }}>
                Ichidan (一段, Ru-verb)
              </span>
            ),
            width: device === "mobile" ? 1 : undefined,
            render: (row) => (
              <Flex down center color={VerbColors.ichidan}>
                {JapaneseSettings.casual && JapaneseSettings.japanese && (
                  <Md text={row.ichidanExample} />
                )}
                {JapaneseSettings.casual && JapaneseSettings.romaji && (
                  <Md text={row.ichidanExampleRomaji} />
                )}
                {JapaneseSettings.keigo && row.ichidanKeigoExample && (
                  <Flex
                    down
                    center
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    {JapaneseSettings.japanese && (
                      <Md text={row.ichidanKeigoExample} />
                    )}
                    {JapaneseSettings.romaji && (
                      <Md text={row.ichidanKeigoExampleRomaji} />
                    )}
                  </Flex>
                )}
              </Flex>
            ),
          },
          {
            name: (
              <span style={{ color: VerbColors.godan }}>
                Godan (五段, U-verb)
              </span>
            ),
            width: device === "mobile" ? 1 : undefined,
            render: (row) => (
              <Flex down color={VerbColors.godan}>
                {JapaneseSettings.casual && JapaneseSettings.japanese && (
                  <Md text={row.godanExample} />
                )}
                {JapaneseSettings.casual && JapaneseSettings.romaji && (
                  <Md text={row.godanExampleRomaji} />
                )}
                {JapaneseSettings.keigo && row.godanKeigoExample && (
                  <Flex
                    down
                    center
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    {JapaneseSettings.japanese && (
                      <Md text={row.godanKeigoExample} />
                    )}
                    {JapaneseSettings.romaji && (
                      <Md text={row.godanKeigoExampleRomaji} />
                    )}
                  </Flex>
                )}
              </Flex>
            ),
          },
          {
            name: (
              <span style={{ color: VerbColors.irregular }}>Irregular</span>
            ),
            width: device === "mobile" ? 1 : undefined,
            render: (row) => (
              <Flex down color={VerbColors.irregular} gap={8}>
                <Flex down center>
                  {JapaneseSettings.casual && JapaneseSettings.japanese && (
                    <Md text={row.irregularSuru} />
                  )}
                  {JapaneseSettings.casual && JapaneseSettings.romaji && (
                    <Md text={row.irregularSuruRomaji} />
                  )}
                  {JapaneseSettings.keigo && JapaneseSettings.japanese && (
                    <Md text={row.irregularKeigoSuru} />
                  )}
                  {JapaneseSettings.keigo && JapaneseSettings.romaji && (
                    <Md text={row.irregularKeigoSuruRomaji} />
                  )}
                </Flex>
                <Flex down center style={{ fontStyle: "italic", opacity: 0.8 }}>
                  {JapaneseSettings.casual && JapaneseSettings.japanese && (
                    <Md text={row.irregularKuru} />
                  )}
                  {JapaneseSettings.casual && JapaneseSettings.romaji && (
                    <Md text={row.irregularKuruRomaji} />
                  )}
                  {JapaneseSettings.keigo && JapaneseSettings.japanese && (
                    <Md text={row.irregularKeigoKuru} />
                  )}
                  {JapaneseSettings.keigo && JapaneseSettings.romaji && (
                    <Md text={row.irregularKeigoKuruRomaji} />
                  )}
                </Flex>
              </Flex>
            ),
          },
        ]}
        data={[
          {
            name: "Present / Future tense",
            description: "Used to describe a current or future action",
            ichidanExample: "食べる",
            ichidanExampleRomaji: "taberu",
            ichidanKeigoExample: "食べます",
            ichidanKeigoExampleRomaji: "tabemasu",
            godanExample: "話す",
            godanExampleRomaji: "hanasu",
            godanKeigoExample: "話します",
            godanKeigoExampleRomaji: "hanashimasu",
            irregularSuru: "する",
            irregularSuruRomaji: "suru",
            irregularKuru: "くる",
            irregularKuruRomaji: "kuru",
            irregularKeigoSuru: "します",
            irregularKeigoSuruRomaji: "shimasu",
            irregularKeigoKuru: "きます",
            irregularKeigoKuruRomaji: "kimasu",
          },
          {
            name: "Present / Future negative tense",
            description:
              "Used to describe a current or future action, but with a negative meaning",
            ichidanExample: "食べ~る~**ない**",
            ichidanExampleRomaji: "tabe~ru~**nai**",
            ichidanKeigoExample: "食べま~す~**せん**",
            ichidanKeigoExampleRomaji: "tabema~su~**sen**",
            godanExample: "話~す~**さない**",
            godanExampleRomaji: "hana~su~**sanai**",
            godanKeigoExample: "話しま~す~**せん**",
            godanKeigoExampleRomaji: "hanashima~su~**sen**",
            irregularSuru: "しない",
            irregularSuruRomaji: "shinai",
            irregularKuru: "こない",
            irregularKuruRomaji: "konai",
            irregularKeigoSuru: "しません",
            irregularKeigoSuruRomaji: "shimasen",
            irregularKeigoKuru: "きません",
            irregularKeigoKuruRomaji: "kimasen",
          },
          {
            name: "Past tense",
            description: "Used to describe a past action",
            ichidanExample: "食べ~る~**た**",
            ichidanExampleRomaji: "tabe~ru~**ta**",
            ichidanKeigoExample: "食べま~す~**した**",
            ichidanKeigoExampleRomaji: "tabema~su~**shita**",
            godanExample: "話~す~**した**",
            godanExampleRomaji: "hana~su~**shita**",
            godanKeigoExample: "話しま~す~**した**",
            godanKeigoExampleRomaji: "hanashima~su~**shita**",
            irregularSuru: "した",
            irregularSuruRomaji: "shita",
            irregularKuru: "きた",
            irregularKuruRomaji: "kita",
            irregularKeigoSuru: "しました",
            irregularKeigoSuruRomaji: "shimashita",
            irregularKeigoKuru: "きました",
            irregularKeigoKuruRomaji: "kimashita",
          },
          {
            name: "Past negative tense",
            description:
              "Used to describe a past action, but with a negative meaning",
            ichidanExample: "食べ**なかった**",
            ichidanExampleRomaji: "tabe**nakatta**",
            ichidanKeigoExample: "食べま**せんでした**",
            ichidanKeigoExampleRomaji: "tabe**masen deshita**",
            godanExample: "話**さなかった**",
            godanExampleRomaji: "hana**sanakatta**",
            godanKeigoExample: "話**しませんでした**",
            godanKeigoExampleRomaji: "hana**shimasen deshita**",
            irregularSuru: "しなかった",
            irregularSuruRomaji: "shinakatta",
            irregularKuru: "こなかった",
            irregularKuruRomaji: "konakatta",
            irregularKeigoSuru: "しませんでした",
            irregularKeigoSuruRomaji: "shimasen deshita",
            irregularKeigoKuru: "きませんでした",
            irregularKeigoKuruRomaji: "kimasen deshita",
          },
          {
            name: "Te form",
            description: "Used for connecting verbs or for making requests",
            ichidanExample: "食べ**て**",
            ichidanExampleRomaji: "tabe**te**",
            ichidanKeigoExample: "食べ**まして**",
            ichidanKeigoExampleRomaji: "tabe**mashite**",
            godanExample: "話**して**",
            godanExampleRomaji: "hana**shite**",
            godanKeigoExample: "話**しまして**",
            godanKeigoExampleRomaji: "hana**shimashite**",
            irregularSuru: "して",
            irregularSuruRomaji: "shite",
            irregularKuru: "きて",
            irregularKuruRomaji: "kite",
            irregularKeigoSuru: "しまして",
            irregularKeigoSuruRomaji: "shimashite",
            irregularKeigoKuru: "きまして",
            irregularKeigoKuruRomaji: "kimashite",
          },
          {
            name: "Tai form",
            description: "Used to express desire to do something",
            ichidanExample: "食べ**たい**",
            ichidanExampleRomaji: "tabe**tai**",
            ichidanKeigoExample: "食べ**たいです**",
            ichidanKeigoExampleRomaji: "tabe**tai desu**",
            godanExample: "話**したい**",
            godanExampleRomaji: "hana**shitai**",
            godanKeigoExample: "話**したいです**",
            godanKeigoExampleRomaji: "hana**shitai desu**",
            irregularSuru: "したい",
            irregularSuruRomaji: "shitai",
            irregularKeigoSuru: "したいです",
            irregularKeigoSuruRomaji: "shitai desu",
            irregularKuru: "きたい",
            irregularKeigoKuru: "きたいです",
            irregularKuruRomaji: "kitai",
            irregularKeigoKuruRomaji: "kitai desu",
          },
          {
            name: "Volitional form",
            description: "Used to express intention or determination",
            ichidanExample: "食べ**よう**",
            ichidanExampleRomaji: "tabe**you**",
            ichidanKeigoExample: "食べ**ましょう**",
            ichidanKeigoExampleRomaji: "tabe**mashou**",
            godanExample: "話**そう**",
            godanExampleRomaji: "hana**sou**",
            godanKeigoExample: "話**しましょう**",
            godanKeigoExampleRomaji: "hana**shimashou**",
            irregularSuru: "しよう",
            irregularSuruRomaji: "shiyou",
            irregularKuru: "こよう",
            irregularKuruRomaji: "koyou",
            irregularKeigoSuru: "しましょう",
            irregularKeigoSuruRomaji: "shimashou",
            irregularKeigoKuru: "きましょう",
            irregularKeigoKuruRomaji: "kimashou",
          },
          {
            name: "Imperative form",
            description: "Used to give commands",
            ichidanExample: "食べ**ろ**",
            ichidanExampleRomaji: "tabe**ro**",
            ichidanKeigoExample: "食べ**てください**",
            ichidanKeigoExampleRomaji: "tabe**te kudasai**",
            godanExample: "話**せ**",
            godanExampleRomaji: "hana**se**",
            godanKeigoExample: "話**してください**",
            godanKeigoExampleRomaji: "hana**shite kudasai**",
            irregularSuru: "しろ",
            irregularSuruRomaji: "shiro",
            irregularKeigoSuru: "してください",
            irregularKeigoSuruRomaji: "shite kudasai",
            irregularKuru: "こい",
            irregularKeigoKuru: "きてください",
            irregularKuruRomaji: "koi",
            irregularKeigoKuruRomaji: "kite kudasai",
          },
          {
            name: "Passive form",
            description: "Used to describe an action being done to the subject",
            ichidanExample: "食べ**られる**",
            ichidanExampleRomaji: "tabe**rareru**",
            ichidanKeigoExample: "食べ**られます**",
            ichidanKeigoExampleRomaji: "tabe**raremasu**",
            godanExample: "話**される**",
            godanExampleRomaji: "hana**sareru**",
            godanKeigoExample: "話**されます**",
            godanKeigoExampleRomaji: "hana**saremasu**",
            irregularSuru: "される",
            irregularSuruRomaji: "sareru",
            irregularKeigoSuru: "されます",
            irregularKeigoSuruRomaji: "saremasu",
            irregularKuru: "こられる",
            irregularKeigoKuru: "こられます",
            irregularKuruRomaji: "korareru",
            irregularKeigoKuruRomaji: "koraremasu",
          },
          {
            name: "Conditional form",
            description: "Used to describe a hypothetical situation",
            ichidanExample: "食べ**たら**",
            ichidanExampleRomaji: "tabe**tara**",
            godanExample: "話**したら**",
            godanExampleRomaji: "hana**shitara**",
            irregularSuru: "したら",
            irregularSuruRomaji: "shitara",
            irregularKuru: "きたら",
            irregularKuruRomaji: "kitara",
          },
          {
            name: "Provisional Conditional form",
            description: "Used to describe a tentative or uncertain situation",
            ichidanExample: "食べ**れば**",
            ichidanExampleRomaji: "tabe**reba**",
            godanExample: "話**せば**",
            godanExampleRomaji: "hana**seba**",
            irregularSuru: "すれば",
            irregularSuruRomaji: "sureba",
            irregularKuru: "くれば",
            irregularKuruRomaji: "kureba",
          },
          {
            name: "Causative form",
            description: "Used to describe causing someone to do something",
            ichidanExample: "食べ**させる**",
            ichidanExampleRomaji: "tabe**saseru**",
            godanExample: "話**させる**",
            godanExampleRomaji: "hana**saseru**",
            irregularSuru: "させる",
            irregularSuruRomaji: "saseru",
            irregularKuru: "こさせる",
            irregularKuruRomaji: "kosaseru",
          },
          {
            name: "Potential form",
            description: "Used to describe ability to do something",
            ichidanExample: "食べ**られる**",
            ichidanExampleRomaji: "tabe**rareru**",
            godanExample: "話**せる**",
            godanExampleRomaji: "hana**seru**",
            irregularSuru: "できる",
            irregularSuruRomaji: "dekiru",
            irregularKeigoSuru: "できます",
            irregularKeigoSuruRomaji: "dekimasu",
            irregularKuru: "こられる",
            irregularKuruRomaji: "korareru",
          },
        ]}
      />
    </ContentBox>
  );
}
