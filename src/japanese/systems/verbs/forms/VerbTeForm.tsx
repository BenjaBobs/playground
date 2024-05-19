import { Animator, Anim } from "@src/common/anim/Animator";
import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { Stack } from "@src/common/stack/Stack";
import { Table } from "@src/common/table/Table";
import { Md } from "@src/common/txt/Md";
import { JapaneseSettings } from "@src/japanese/japanese-sitemap";
import { KanaTable } from "@src/japanese/kana-table/KanaTable";
import { VerbColors } from "@src/japanese/systems/verbs/VerbsOverview";

export function VerbTeForm() {
  return (
    <ContentBox>
      <h1>Te-form</h1>
      <p>
        The te-form is used to connect sentences, list actions, and is used in
        many other ways. It is a very important part of the Japanese language.
      </p>
      <p>
        Te-form usually ends with a kana from the e-column and the t-row or
        d-row of the Kana table.
      </p>
      <KanaTable
        style={{ fontSize: 5, maxWidth: 200, padding: 24 }}
        ghostCellStyle={(kana) => {
          return ["te", "de"].includes(kana?.romaji ?? "")
            ? { border: "2px solid red" }
            : undefined;
        }}
      />
      <h2>Conjugation table</h2>
      <Table
        rowKey={(row) => row.exampleHiragana}
        data={teFormTableData}
        columns={[
          {
            name: "Class",
            render: (row) => <Md text={row.class} />,
          },
          {
            name: "Ending",
            render: (row) => (
              <Flex down>
                {JapaneseSettings.hiragana && <Md text={row.endingsHiragana} />}
                {JapaneseSettings.romaji && <Md text={row.endingsRomaji} />}
              </Flex>
            ),
          },
          {
            name: "Example",
            render: (row) => (
              <Flex down>
                {JapaneseSettings.hiragana && <Md text={row.exampleHiragana} />}
                {JapaneseSettings.romaji && <Md text={row.exampleRomaji} />}
              </Flex>
            ),
          },
          {
            name: "→",
            render: (row) => (
              <Flex down>
                {JapaneseSettings.hiragana && (
                  <Md text={row.transformationHiragana} />
                )}
                {JapaneseSettings.romaji && (
                  <Md text={row.transformationRomaji} />
                )}
              </Flex>
            ),
          },
          {
            name: "Te-form",
            render: (row) => (
              <Flex down>
                {JapaneseSettings.hiragana && <Md text={row.teFormHiragana} />}
                {JapaneseSettings.romaji && <Md text={row.teFormRomaji} />}
              </Flex>
            ),
          },
        ]}
        cellStyle={(cell) => {
          if (cell.isHeader) return undefined;

          // ichidan
          if (cell.rowIdx === 0) {
            return {
              borderBottom: "1px solid lightgray",
              color: VerbColors.ichidan,
            };
          }

          // godan
          if (cell.rowIdx < 6) {
            return {
              borderBottom:
                cell.rowIdx === 5 ? "1px solid lightgray" : undefined,
              color: VerbColors.godan,
            };
          }

          return {
            color: VerbColors.irregular,
          };
        }}
      />

      <div>
        <h3>Example of Ichidan (一段) verb</h3>
        <Animator>
          <Anim
            setup={(x) => [
              {
                target: [x.querySelector(".kana-ru")!],
                keyframes: [
                  { offset: 0 },
                  {
                    offset: 0.5,
                    opacity: 1,
                    color: "red",
                    translate: "0% 0%",
                  },
                  {
                    offset: 1,
                    opacity: 0,
                    translate: "0% -150%",
                  },
                ],
              },
              {
                target: [x.querySelector(".kana-te")!],
                keyframes: [
                  { offset: 0, opacity: 0, translate: " 0% 150%" },
                  { offset: 0.5, opacity: 0, translate: " 0% 150%" },
                  {
                    offset: 1,
                    opacity: 1,
                    translate: "0% 0%",
                    color: "green",
                  },
                ],
              },
            ]}
          >
            <Flex right justify="center">
              <Kana kana="た" romaji="ta" />
              <Kana kana="べ" romaji="be" />
              <KanaSwap
                kana="る"
                romaji="ru"
                replacementKana="て"
                replacementRomaji="te"
              />
            </Flex>
          </Anim>
        </Animator>
        <h3>Example of Godan (五段) verb</h3>
        <Animator>
          <Anim
            setup={(x) => [
              {
                target: [x.querySelector(".kana-u")!],
                keyframes: [
                  { offset: 0, opacity: 1, translate: "0% 0%", color: "black" },
                  {
                    offset: 0.5,
                    opacity: 1,
                    color: "red",
                    translate: "0% 0%",
                  },
                  {
                    offset: 1,
                    opacity: 0,
                    translate: "0% -150%",
                    color: "red",
                  },
                ],
              },
              {
                target: x.querySelectorAll(".kana-t,.kana-te"),
                keyframes: [
                  { offset: 0, opacity: 0, translate: "0% 150%" },
                  { offset: 0.5, opacity: 0, translate: "0% 150%" },
                  {
                    offset: 1,
                    opacity: 1,
                    translate: "0% 0%",
                    color: "green",
                  },
                ],
              },
            ]}
          >
            <Flex right justify="center">
              <Kana kana="あ" romaji="a" />
              <KanaSwap
                kana="う"
                romaji="u"
                replacementKana="っ"
                replacementRomaji="t"
              />
              <KanaSwap
                kana=""
                romaji=""
                replacementKana="て"
                replacementRomaji="te"
              />
            </Flex>
          </Anim>
        </Animator>
        <h3>Example of irregular verb</h3>
        <Animator duration={5}>
          <Stack>
            <Flex right>
              <Anim
                setup={(x) => [
                  {
                    target: [x.querySelector(".kana-ku")!],
                    easing: "linear",
                    keyframes: [
                      { offset: 0.4 },
                      { offset: 0.5, color: "red", translate: "0% 0%" },
                      {
                        offset: 0.6,
                        opacity: 1,
                      },
                      {
                        offset: 0.7,
                        translate: "0% -150%",
                        opacity: 0,
                      },
                    ],
                  },
                  {
                    target: [x.querySelector(".kana-ki")!],
                    easing: "ease-out",
                    keyframes: [
                      { offset: 0, opacity: 0, translate: "150% 0%" },
                      {
                        offset: 0.5,
                        opacity: 0,
                        translate: "-150% 0%",
                        color: "green",
                      },
                      {
                        offset: 0.7,
                        opacity: 1,
                        translate: "0% 0%",
                      },
                      {
                        offset: 1,
                        opacity: 1,
                        translate: "0% 0%",
                      },
                    ],
                  },
                  {
                    target: [x.querySelector(".kana-ru")!],
                    keyframes: [
                      { offset: 0, opacity: 1, translate: "0% 0%" },
                      {
                        offset: 0.8,
                        opacity: 1,
                        color: "black",
                        translate: "0% 0%",
                      },
                      {
                        offset: 1,
                        opacity: 0,
                        translate: "0% -150%",
                        color: "red",
                      },
                    ],
                  },
                  {
                    target: [x.querySelector(".kana-te")!],
                    keyframes: [
                      { offset: 0, opacity: 0, translate: "150% 0%" },
                      { offset: 0.8, opacity: 0, translate: "150% 0%" },
                      {
                        offset: 1,
                        opacity: 1,
                        translate: "0% 0%",
                        color: "green",
                      },
                    ],
                  },
                ]}
              >
                <Kana kana="く" romaji="ku" />
                <Kana kana="き" romaji="ki" replacement />
                <Kana kana="る" romaji="ru" />
                <Kana kana="て" romaji="te" replacement />
              </Anim>
            </Flex>
            <Anim
              setup={(x) => [
                {
                  target: [x.querySelector(".kana-table")!],
                  easing: "linear",
                  keyframes: [
                    { offset: 0, opacity: 0 },
                    { offset: 0.05, opacity: 1 },
                    { offset: 0.35, opacity: 1 },
                    { offset: 0.4, opacity: 0 },
                  ],
                },
                {
                  target: [...x.querySelectorAll(".header")],
                  keyframes: [
                    {
                      offset: 0,
                      fontSize: "5em",
                    },
                  ],
                },
                {
                  target: [...x.querySelectorAll(".kana-column-ghost.col-u")],
                  keyframes: [
                    {
                      offset: 0,
                      border: "1px solid black",
                    },
                    {
                      offset: 0.05,
                      translate: "0%",
                    },
                    {
                      offset: 0.2,
                      translate: "calc(-100% - 1em)",
                    },
                  ],
                },
              ]}
            >
              <KanaTable style={{ fontSize: 3, opacity: 0 }} />
            </Anim>
          </Stack>
        </Animator>
      </div>
    </ContentBox>
  );
}

function KanaSwap(props: {
  kana: string;
  romaji: string;
  replacementKana: string;
  replacementRomaji: string;
}) {
  return (
    <Stack>
      <Kana kana={props.kana} romaji={props.romaji} />
      <Kana kana={props.replacementKana} romaji={props.replacementRomaji} />
    </Stack>
  );
}

function Kana(props: { kana: string; romaji: string; replacement?: boolean }) {
  return (
    <Flex
      down
      slim
      className={"kana-" + props.romaji}
      style={{
        marginLeft: props.replacement ? "-25%" : undefined,
        opacity: props.replacement ? 0 : undefined,
      }}
    >
      <span>{props.kana}</span>
      <span>{props.romaji}</span>
    </Flex>
  );
}

const teFormTableData: {
  class: string;
  endingsHiragana: string;
  endingsRomaji: string;
  transformationHiragana: string;
  transformationRomaji: string;
  exampleHiragana: string;
  exampleRomaji: string;
  teFormHiragana: string;
  teFormRomaji: string;
}[] = [
  {
    class: "Ichidan (一段)<br/>-ru verbs",
    endingsHiragana: "る",
    endingsRomaji: "ru",
    transformationHiragana: "-て",
    transformationRomaji: "-te",
    exampleHiragana: "たべ**る**",
    exampleRomaji: "tabe**ru**",
    teFormHiragana: "たべ**て**",
    teFormRomaji: "tabe**te**",
  },
  {
    class: "Godan (五段)<br/>-u verbs",
    endingsHiragana: "す",
    endingsRomaji: "su",
    transformationHiragana: "-して",
    transformationRomaji: "-shite",
    exampleHiragana: "はな**す**",
    exampleRomaji: "hana**su**",
    teFormHiragana: "はな**して**",
    teFormRomaji: "hana**shite**",
  },
  {
    class: "",
    endingsHiragana: "つ・る・う",
    endingsRomaji: "tsu・ru・u",
    transformationHiragana: "-って",
    transformationRomaji: "-tte",
    exampleHiragana: "ま**つ**",
    exampleRomaji: "ma**tsu**",
    teFormHiragana: "ま**って**",
    teFormRomaji: "ma**tte**",
  },
  {
    class: "",
    endingsHiragana: "く",
    endingsRomaji: "ku",
    transformationHiragana: "-いて",
    transformationRomaji: "-ite",
    exampleHiragana: "か**く**",
    exampleRomaji: "ka**ku**",
    teFormHiragana: "か**いて**",
    teFormRomaji: "ka**ite**",
  },
  {
    class: "",
    endingsHiragana: "ぐ",
    endingsRomaji: "gu",
    transformationHiragana: "-いで",
    transformationRomaji: "-ide",
    exampleHiragana: "およ**ぐ**",
    exampleRomaji: "oyo**gu**",
    teFormHiragana: "およ**いで**",
    teFormRomaji: "oyo**ide**",
  },
  {
    class: "",
    endingsHiragana: "ぬ・ぶ・む",
    endingsRomaji: "nu・bu・mu",
    transformationHiragana: "-んで",
    transformationRomaji: "-nde",
    exampleHiragana: "の**む**",
    exampleRomaji: "no**mu**",
    teFormHiragana: "の**んで**",
    teFormRomaji: "no**nde**",
  },
  {
    class: "Irregular",
    endingsHiragana: "",
    endingsRomaji: "",
    transformationHiragana: "して",
    transformationRomaji: "shite",
    exampleHiragana: "する",
    exampleRomaji: "suru",
    teFormHiragana: "**して**",
    teFormRomaji: "**shite**",
  },
  {
    class: "",
    endingsHiragana: "",
    endingsRomaji: "",
    transformationHiragana: "きて",
    transformationRomaji: "kite",
    exampleHiragana: "くる",
    exampleRomaji: "kuru",
    teFormHiragana: "きて",
    teFormRomaji: "kite",
  },
];
