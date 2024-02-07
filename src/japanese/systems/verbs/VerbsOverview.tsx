import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { Table } from "@src/common/table/Table";
import { KanaUtils } from "@src/japanese/utils/kana-utils";
import Highlighter from "react-highlight-words";

export const VerbColors = {
  godan: "oklch(0.5 0.1 150)",
  ichidan: "oklch(0.5 0.1 250)",
  irregular: "oklch(0.5 0.1 50)",
} as const;

export function VerbsOverview() {
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
        ichidanConjugation: React.ReactNode;
        ichidanExample: string;
        ichidanHighlight?: string;
        ichidanKeigoConjugation?: React.ReactNode;
        ichidanKeigoExample?: string;
        ichidanKeigoHighlight?: string;
        godanConjugation: React.ReactNode;
        godanExample: string;
        godanHighlight?: string;
        godanKeigoConjugation?: React.ReactNode;
        godanKeigoExample?: string;
        godanKeigoHighlight?: string;
        irregularSuru: string;
        irregularKuru: string;
        irregularKeigoSuru?: string;
        irregularKeigoKuru?: string;
      }>
        rowKey={(row) => row.name}
        cellStyle={(colIdx) => {
          return {
            borderLeft: colIdx !== 0 ? "1px solid rgba(0,0,0, 0.1)" : "none",
            borderBottom: "1px solid rgba(0,0,0, 0.1)",
          };
        }}
        columns={[
          {
            name: "Name",
            render: (row) => (
              <Flex down>
                <span>{row.name}</span>
                {row.godanKeigoExample ||
                row.ichidanKeigoExample ||
                row.irregularKeigoSuru ||
                row.irregularKeigoKuru ? (
                  <i>Keigo</i>
                ) : null}
              </Flex>
            ),
          },
          { name: "Description", render: (row) => row.description },
          {
            name: (
              <span style={{ color: VerbColors.ichidan }}>
                Ichidan (一段, Ru-verb)
              </span>
            ),
            render: (row) => (
              <Flex down color={VerbColors.ichidan}>
                <Flex justify="space-around">
                  {row.ichidanConjugation && (
                    <>
                      <span>{row.ichidanConjugation}</span>→
                    </>
                  )}
                  <Highlighter
                    highlightStyle={{
                      filter: "brightness(1.5)",
                    }}
                    searchWords={KanaUtils.toAll(row.ichidanHighlight ?? "")}
                    textToHighlight={row.ichidanExample!}
                  />
                </Flex>
                {row.ichidanKeigoConjugation && (
                  <Flex
                    justify="space-between"
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    <span>{row.ichidanKeigoConjugation}</span>→
                    <Highlighter
                      highlightStyle={{
                        filter: "brightness(1.5)",
                      }}
                      searchWords={KanaUtils.toAll(
                        row.ichidanKeigoHighlight ?? ""
                      )}
                      textToHighlight={row.ichidanKeigoExample!}
                    />
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
            render: (row) => (
              <Flex down color={VerbColors.godan}>
                <Flex justify="space-around">
                  {row.godanConjugation && (
                    <>
                      <span>{row.godanConjugation}</span>→
                    </>
                  )}
                  <Highlighter
                    highlightStyle={{
                      filter: "brightness(1.5)",
                    }}
                    searchWords={KanaUtils.toAll(row.godanHighlight ?? "")}
                    textToHighlight={row.godanExample!}
                  />
                </Flex>
                {row.godanKeigoConjugation && (
                  <Flex
                    justify="space-between"
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    <span>{row.godanKeigoConjugation}</span>→
                    <Highlighter
                      highlightStyle={{
                        filter: "brightness(1.5)",
                      }}
                      searchWords={KanaUtils.toAll(
                        row.godanKeigoHighlight ?? ""
                      )}
                      textToHighlight={row.godanKeigoExample!}
                    />
                  </Flex>
                )}
              </Flex>
            ),
          },
          {
            name: (
              <span style={{ color: VerbColors.irregular }}>Irregular</span>
            ),
            render: (row) => (
              <Flex down color={VerbColors.irregular}>
                <Flex justify="space-between">
                  <span>{row.irregularSuru}</span>
                  <span>{row.irregularKuru}</span>
                </Flex>
                <Flex
                  justify="space-between"
                  style={{ fontStyle: "italic", opacity: 0.8 }}
                >
                  <span>{row.irregularKeigoSuru}</span>
                  <span>{row.irregularKeigoKuru}</span>
                </Flex>
              </Flex>
            ),
          },
        ]}
        data={[
          {
            name: "Present/Future tense",
            description: "Used to describe a current or future action",
            ichidanConjugation: "",
            ichidanExample: "食べる (taberu)",
            ichidanKeigoConjugation: (
              <span>
                <Swap from="る" to="ます" /> (<Swap from="ru" to="masu" />)
              </span>
            ),
            ichidanKeigoExample: "食べます (tabemasu)",
            ichidanKeigoHighlight: "masu",
            godanConjugation: "",
            godanExample: "話す (hanasu)",
            godanKeigoConjugation: (
              <span>
                <Swap from="す" to="します" /> (<Swap from="su" to="shimasu" />)
              </span>
            ),
            godanKeigoExample: "話します (hanashimasu)",
            godanKeigoHighlight: "shimasu",
            irregularSuru: "する (suru)",
            irregularKuru: "くる (kuru)",
            irregularKeigoSuru: "します (shimasu)",
            irregularKeigoKuru: "きます (kimasu)",
          },
          {
            name: "Present/Future negative tense",
            description:
              "Used to describe a current or future action, but with a negative meaning",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="ない" /> (<Swap from="ru" to="nai" />)
              </span>
            ),
            ichidanExample: "食べない (tabenai)",
            ichidanHighlight: "nai",
            ichidanKeigoConjugation: (
              <span>
                <Swap from="る" to="ません" /> (<Swap from="ru" to="masen" />)
              </span>
            ),
            ichidanKeigoExample: "食べません (tabemasen)",
            ichidanKeigoHighlight: "masen",
            godanConjugation: (
              <span>
                <Swap from="す" to="さない" /> (<Swap from="su" to="sanai" />)
              </span>
            ),
            godanExample: "話さない (hanasanai)",
            godanHighlight: "sanai",
            godanKeigoConjugation: (
              <span>
                <Swap from="す" to="しません" /> (
                <Swap from="su" to="shimasen" />)
              </span>
            ),
            godanKeigoExample: "話しません (hanashimasen)",
            godanKeigoHighlight: "shimasen",
            irregularSuru: "しない (shinai)",
            irregularKuru: "こない (konai)",
            irregularKeigoSuru: "しません (shimasen)",
            irregularKeigoKuru: "きません (kimasen)",
          },
          {
            name: "Past tense",
            description: "Used to describe a past action",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="た" /> (<Swap from="ru" to="ta" />)
              </span>
            ),
            ichidanExample: "食べた (tabeta)",
            ichidanHighlight: "ta",
            ichidanKeigoConjugation: (
              <span>
                <Swap from="る" to="ました" /> (<Swap from="ru" to="mashita" />)
              </span>
            ),
            ichidanKeigoExample: "食べました (tabemashita)",
            ichidanKeigoHighlight: "mashita",
            godanConjugation: (
              <span>
                <Swap from="す" to="した" /> (<Swap from="su" to="shita" />)
              </span>
            ),
            godanExample: "話した (hanashita)",
            godanHighlight: "shita",
            godanKeigoConjugation: (
              <span>
                <Swap from="す" to="しました" /> (
                <Swap from="su" to="shimashita" />)
              </span>
            ),
            godanKeigoExample: "話しました (hanashimashita)",
            godanKeigoHighlight: "shimashita",
            irregularSuru: "した (shita)",
            irregularKuru: "きた (kita)",
            irregularKeigoSuru: "しました (shimashita)",
            irregularKeigoKuru: "きました (kimashita)",
          },
          {
            name: "Past negative tense",
            description:
              "Used to describe a past action, but with a negative meaning",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="なかった" /> (
                <Swap from="ru" to="nakatta" />)
              </span>
            ),
            ichidanExample: "食べなかった (tabenakatta)",
            ichidanHighlight: "nakatta",
            ichidanKeigoConjugation: (
              <span>
                <Swap from="る" to="ませんでした" /> (
                <Swap from="ru" to="masendeshita" />)
              </span>
            ),
            ichidanKeigoExample: "食べませんでした (tabemasendeshita)",
            ichidanKeigoHighlight: "masendeshita",
            godanConjugation: (
              <span>
                <Swap from="す" to="さなかった" /> (
                <Swap from="su" to="sanakatta" />)
              </span>
            ),
            godanExample: "話さなかった (hanasanakatta)",
            godanHighlight: "sanakatta",
            godanKeigoConjugation: (
              <span>
                <Swap from="す" to="しませんでした" /> (
                <Swap from="su" to="shimasendeshita" />)
              </span>
            ),
            godanKeigoExample: "話しませんでした (hanashimasendeshita)",
            godanKeigoHighlight: "shimasendeshita",
            irregularSuru: "しなかった (shinakatta)",
            irregularKuru: "こなかった (konakatta)",
            irregularKeigoSuru: "しませんでした (shimasendeshita)",
            irregularKeigoKuru: "きませんでした (kimasendeshita)",
          },
          {
            name: "Te form",
            description: "Used for connecting verbs or for making requests",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="て" /> (<Swap from="ru" to="te" />)
              </span>
            ),
            ichidanExample: "食べて (tabete)",
            ichidanHighlight: "te",
            ichidanKeigoConjugation: (
              <span>
                <Swap from="る" to="まして" /> (<Swap from="ru" to="mashite" />)
              </span>
            ),
            ichidanKeigoExample: "食べまして (tabemashite)",
            ichidanKeigoHighlight: "mashite",
            godanConjugation: (
              <span>
                <Swap from="す" to="して" /> (<Swap from="su" to="shite" />)
              </span>
            ),
            godanExample: "話して (hanashite)",
            godanHighlight: "shite",
            godanKeigoConjugation: (
              <span>
                <Swap from="す" to="しまして" /> (
                <Swap from="su" to="shimashite" />)
              </span>
            ),
            godanKeigoExample: "話しまして (hanashimashite)",
            godanKeigoHighlight: "shimashite",
            irregularSuru: "して (shite)",
            irregularKuru: "きて (kite)",
            irregularKeigoSuru: "しまして (shimashite)",
            irregularKeigoKuru: "きまして (kimashite)",
          },
          {
            name: "Tai form",
            description: "Used to express desire to do something",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="たい" /> (<Swap from="ru" to="tai" />)
              </span>
            ),
            ichidanExample: "食べたい (tabetai)",
            ichidanHighlight: "tai",
            ichidanKeigoConjugation: (
              <span>
                <Swap from="る" to="たいです" /> (
                <Swap from="ru" to="taidesu" />)
              </span>
            ),
            ichidanKeigoExample: "食べたいです (tabetaidesu)",
            ichidanKeigoHighlight: "taidesu",
            godanConjugation: (
              <span>
                <Swap from="す" to="したい" /> (<Swap from="su" to="shitai" />)
              </span>
            ),
            godanExample: "話したい (hanashitai)",
            godanHighlight: "shitai",
            godanKeigoConjugation: (
              <span>
                <Swap from="す" to="したいです" /> (
                <Swap from="su" to="shitaidesu" />)
              </span>
            ),
            godanKeigoExample: "話したいです (hanashitaidesu)",
            godanKeigoHighlight: "shitaidesu",
            irregularSuru: "したい (shitai)",
            irregularKuru: "きたい (kitai)",
          },
          {
            name: "Volitional form",
            description: "Used to express intention or determination",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="よう" /> (<Swap from="ru" to="you" />)
              </span>
            ),
            ichidanExample: "食べよう (tabeyou)",
            ichidanHighlight: "you",
            ichidanKeigoConjugation: (
              <span>
                <Swap from="る" to="ましょう" /> (
                <Swap from="ru" to="mashou" />)
              </span>
            ),
            ichidanKeigoExample: "食べましょう (tabemashou)",
            ichidanKeigoHighlight: "mashou",
            godanConjugation: (
              <span>
                <Swap from="す" to="そう" /> (<Swap from="su" to="sou" />)
              </span>
            ),
            godanExample: "話そう (hanasou)",
            godanHighlight: "sou",
            godanKeigoConjugation: (
              <span>
                <Swap from="す" to="しましょう" /> (
                <Swap from="su" to="shimashou" />)
              </span>
            ),
            godanKeigoExample: "話しましょう (hanashimashou)",
            godanKeigoHighlight: "shimashou",
            irregularSuru: "しよう (shiyou)",
            irregularKuru: "こよう (koyou)",
            irregularKeigoSuru: "しましょう (shimashou)",
            irregularKeigoKuru: "きましょう (kimashou)",
          },
          {
            name: "Imperative form",
            description: "Used to give commands",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="ろ" /> (<Swap from="ru" to="ro" />)
              </span>
            ),
            ichidanExample: "食べろ (tabero)",
            godanConjugation: (
              <span>
                <Swap from="す" to="しろ" /> (<Swap from="su" to="shiro" />)
              </span>
            ),
            godanExample: "話せ (hanase)",
            irregularSuru: "しろ (shiro)",
            irregularKuru: "こい (koi)",
          },
          {
            name: "Passive form",
            description: "Used to describe an action being done to the subject",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="られる" /> (<Swap from="ru" to="rareru" />)
              </span>
            ),
            ichidanExample: "食べられる (taberareru)",
            godanConjugation: (
              <span>
                <Swap from="す" to="される" /> (<Swap from="su" to="sareru" />)
              </span>
            ),
            godanExample: "話される (hanasareru)",
            irregularSuru: "される (sareru)",
            irregularKuru: "こられる (korareru)",
          },
          {
            name: "Conditional form (tara)",
            description: "Used to describe a hypothetical situation",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="たら" /> (<Swap from="ru" to="tara" />)
              </span>
            ),
            ichidanExample: "食べたら (tabetara)",
            godanConjugation: (
              <span>
                <Swap from="す" to="したら" /> (<Swap from="su" to="shitara" />)
              </span>
            ),
            godanExample: "話したら (hanashitara)",
            irregularSuru: "したら (shitara)",
            irregularKuru: "きたら (kitara)",
          },
          {
            name: "Provisional Conditional form (reba)",
            description: "Used to describe a tentative or uncertain situation",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="れば" /> (<Swap from="ru" to="reba" />)
              </span>
            ),
            ichidanExample: "食べれば (tabereba)",
            godanConjugation: (
              <span>
                <Swap from="す" to="すれば" /> (<Swap from="su" to="sureba" />)
              </span>
            ),
            godanExample: "話せば (hanaseba)",
            irregularSuru: "すれば (sureba)",
            irregularKuru: "くれば (kureba)",
          },
          {
            name: "Causative form",
            description: "Used to describe causing someone to do something",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="させる" /> (<Swap from="ru" to="saseru" />)
              </span>
            ),
            ichidanExample: "食べさせる (tabesaseru)",
            godanConjugation: (
              <span>
                <Swap from="す" to="させる" /> (<Swap from="su" to="saseru" />)
              </span>
            ),
            godanExample: "話させる (hanasaseru)",
            irregularSuru: "させる (saseru)",
            irregularKuru: "こさせる (kosaseru)",
          },
          {
            name: "Potential form",
            description: "Used to describe ability to do something",
            ichidanConjugation: (
              <span>
                <Swap from="る" to="られる" /> (<Swap from="ru" to="rareru" />)
              </span>
            ),
            ichidanExample: "食べられる (taberareru)",
            godanConjugation: (
              <span>
                <Swap from="す" to="できる" /> (<Swap from="su" to="dekiru" />)
              </span>
            ),
            godanExample: "話せる (hanaseru)",
            irregularSuru: "できる (dekiru)",
            irregularKuru: "こられる (korareru)",
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

function Swap(props: { from?: React.ReactNode; to?: React.ReactNode }) {
  return (
    <span>
      <s style={{ color: "red", opacity: 0.5 }}>{props.from}</s>
      {props.to}
    </span>
  );
}
