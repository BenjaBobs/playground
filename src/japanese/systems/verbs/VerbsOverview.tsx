import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { useDevice } from "@src/common/hooks/useDeviceSize";
import { Table } from "@src/common/table/Table";
import { Md } from "@src/common/txt/Md";
import { JapaneseSettings } from "@src/japanese/japanese-sitemap";
import { useSnapshot } from "valtio";

export const VerbColors = {
  godan: "oklch(0.5 0.1 150)",
  ichidan: "oklch(0.5 0.1 250)",
  irregular: "oklch(0.5 0.1 50)",
} as const;

export function VerbsOverview() {
  const device = useDevice();
  const settings = useSnapshot(JapaneseSettings);

  return (
    <ContentBox>
      <Flex center gap={40}>
        <Flex down>
          <div>
            <input
              id="japanese-checkbox"
              checked={settings.japanese}
              onChange={(evt) =>
                (JapaneseSettings.japanese = evt.target.checked)
              }
              type="checkbox"
            />
            <label htmlFor="japanese-checkbox">Japanese</label>
          </div>
          <div>
            <input
              id="romaji-checkbox"
              checked={settings.romaji}
              onChange={(evt) => (JapaneseSettings.romaji = evt.target.checked)}
              type="checkbox"
            />
            <label htmlFor="romaji-checkbox">Romaji</label>
          </div>
        </Flex>
        <Flex down>
          <div>
            <input
              id="casual-checkbox"
              checked={settings.casual}
              onChange={(evt) => (JapaneseSettings.casual = evt.target.checked)}
              type="checkbox"
            />
            <label htmlFor="casual-checkbox">Casual</label>
          </div>
          <div>
            <input
              id="keigo-checkbox"
              checked={settings.keigo}
              onChange={(evt) => (JapaneseSettings.keigo = evt.target.checked)}
              type="checkbox"
            />
            <label htmlFor="keigo-checkbox">Keigo</label>
          </div>
        </Flex>
      </Flex>
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
        cellStyle={(_, row) => {
          return { color: row.color };
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
        cellStyle={(colIdx) => {
          return {
            borderLeft:
              device !== "mobile" && colIdx !== 0
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
                <span>{row.name}</span>
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
                {settings.casual && settings.japanese && (
                  <Md text={row.ichidanExample} />
                )}
                {settings.casual && settings.romaji && (
                  <Md text={row.ichidanExampleRomaji} />
                )}
                {settings.keigo && row.ichidanKeigoExample && (
                  <Flex
                    down
                    center
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    {settings.japanese && <Md text={row.ichidanKeigoExample} />}
                    {settings.romaji && (
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
                {settings.casual && settings.japanese && (
                  <Md text={row.godanExample} />
                )}
                {settings.casual && settings.romaji && (
                  <Md text={row.godanExampleRomaji} />
                )}
                {settings.keigo && row.godanKeigoExample && (
                  <Flex
                    down
                    center
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    {settings.japanese && <Md text={row.godanKeigoExample} />}
                    {settings.romaji && (
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
                  {settings.casual && settings.japanese && (
                    <Md text={row.irregularSuru} />
                  )}
                  {settings.casual && settings.romaji && (
                    <Md text={row.irregularSuruRomaji} />
                  )}
                  {settings.keigo && settings.japanese && (
                    <Md text={row.irregularKeigoSuru} />
                  )}
                  {settings.keigo && settings.romaji && (
                    <Md text={row.irregularKeigoSuruRomaji} />
                  )}
                </Flex>
                <Flex down center style={{ fontStyle: "italic", opacity: 0.8 }}>
                  {settings.casual && settings.japanese && (
                    <Md text={row.irregularKuru} />
                  )}
                  {settings.casual && settings.romaji && (
                    <Md text={row.irregularKuruRomaji} />
                  )}
                  {settings.keigo && settings.japanese && (
                    <Md text={row.irregularKeigoKuru} />
                  )}
                  {settings.keigo && settings.romaji && (
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
            ichidanExample: "食べよう",
            ichidanExampleRomaji: "tabeyou",
            ichidanKeigoExample: "食べましょう",
            ichidanKeigoExampleRomaji: "tabemashou",
            godanExample: "話そう",
            godanExampleRomaji: "hanasou",
            godanKeigoExample: "話しましょう",
            godanKeigoExampleRomaji: "hanashimashou",
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
            ichidanExample: "食べろ",
            ichidanExampleRomaji: "tabero",
            godanExample: "話せ",
            godanExampleRomaji: "hanase",
            irregularSuru: "しろ",
            irregularSuruRomaji: "shiro",
            irregularKuru: "こい",
            irregularKuruRomaji: "koi",
          },
          {
            name: "Passive form",
            description: "Used to describe an action being done to the subject",
            ichidanExample: "食べられる",
            ichidanExampleRomaji: "taberareru",
            godanExample: "話される",
            godanExampleRomaji: "hanasareru",
            irregularSuru: "される",
            irregularSuruRomaji: "sareru",
            irregularKuru: "こられる",
            irregularKuruRomaji: "korareru",
          },
          {
            name: "Conditional form",
            description: "Used to describe a hypothetical situation",
            ichidanExample: "食べたら",
            ichidanExampleRomaji: "tabetara",
            godanExample: "話したら",
            godanExampleRomaji: "hanashitara",
            irregularSuru: "したら",
            irregularSuruRomaji: "shitara",
            irregularKuru: "きたら",
            irregularKuruRomaji: "kitara",
          },
          {
            name: "Provisional Conditional form",
            description: "Used to describe a tentative or uncertain situation",
            ichidanExample: "食べれば",
            ichidanExampleRomaji: "tabereba",
            godanExample: "話せば",
            godanExampleRomaji: "hanaseba",
            irregularSuru: "すれば",
            irregularSuruRomaji: "sureba",
            irregularKuru: "くれば",
            irregularKuruRomaji: "kureba",
          },
          {
            name: "Causative form",
            description: "Used to describe causing someone to do something",
            ichidanExample: "食べさせる",
            ichidanExampleRomaji: "tabesaseru",
            godanExample: "話させる",
            godanExampleRomaji: "hanasaseru",
            irregularSuru: "させる",
            irregularSuruRomaji: "saseru",
            irregularKuru: "こさせる",
            irregularKuruRomaji: "kosaseru",
          },
          {
            name: "Potential form",
            description: "Used to describe ability to do something",
            ichidanExample: "食べられる",
            ichidanExampleRomaji: "taberareru",
            godanExample: "話せる",
            godanExampleRomaji: "hanaseru",
            irregularSuru: "できる",
            irregularSuruRomaji: "dekiru",
            irregularKuru: "こられる",
            irregularKuruRomaji: "korareru",
          },
        ]}
      />
      <div>
        TODO:
        <ul>
          <li>Go over the data and make sure it's actually correct</li>
          <li>Check mobile design</li>
          <li>Is there a negative-tai form?</li>
          <li>Which other forms have negatives?</li>
          <li>Compact by inlining the strike-through?</li>
        </ul>
      </div>
    </ContentBox>
  );
}
