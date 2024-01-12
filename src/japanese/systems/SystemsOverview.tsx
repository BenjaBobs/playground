import { Anim, Animator } from "@src/common/anim/Animator";
import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { Stack } from "@src/common/stack/Stack";
import { Table } from "@src/common/table/Table";
import { KanaTable } from "@src/japanese/kana-table/KanaTable";
import Highlighter from "react-highlight-words";

import "@src/japanese/systems/SystemsOverview.scss";
import { KanaUtils } from "@src/japanese/utils/kana-utils";

const teFormTableData: {
  class: string;
  endings: string[];
  transformation: string;
  example: string;
  teForm: string;
}[] = [
  {
    class: "Ichidan (一段)",
    endings: ["る"],
    transformation: "-て",
    example: "たべる",
    teForm: "たべて",
  },
  {
    class: "Godan (五段)",
    endings: ["す"],
    transformation: "-して",
    example: "はなす",
    teForm: "はなして",
  },
  {
    class: "",
    endings: ["つ", "る", "う"],
    transformation: "-って",
    example: "まつ",
    teForm: "まって",
  },
  {
    class: "",
    endings: ["く"],
    transformation: "-いて",
    example: "かく",
    teForm: "かいて",
  },
  {
    class: "",
    endings: ["ぐ"],
    transformation: "-いで",
    example: "およぐ",
    teForm: "およいで",
  },
  {
    class: "",
    endings: ["ぬ", "ぶ", "む"],
    transformation: "-んで",
    example: "のむ",
    teForm: "のんで",
  },
  {
    class: "Irregular",
    endings: [],
    transformation: "して",
    example: "する",
    teForm: "して",
  },
  {
    class: "",
    endings: [],
    transformation: "きて",
    example: "くる",
    teForm: "きて",
  },
];

export function SystemsOverview() {
  return (
    <ContentBox>
      <h1>Verbs</h1>
      <h2>Te-form</h2>

      <Table
        data={teFormTableData}
        columns={[
          {
            name: "Class",
            render: (row) => row.class,
          },
          {
            name: "Ending",
            render: (row) => (
              <Flex down>
                <div>{row.endings.join("/")}</div>
                <div>{KanaUtils.toRomaji(row.endings.join("/"))}</div>
              </Flex>
            ),
          },
          {
            name: "Example",
            render: (row) => (
              <Flex down>
                <Highlighter
                  highlightStyle={{
                    filter: "brightness(1.5)",
                  }}
                  searchWords={row.endings}
                  textToHighlight={row.example}
                />
                <Highlighter
                  highlightStyle={{
                    filter: "brightness(1.5)",
                  }}
                  searchWords={KanaUtils.toRomaji(row.endings.join("/")).split(
                    "/"
                  )}
                  textToHighlight={KanaUtils.toRomaji(row.example)}
                />
              </Flex>
            ),
          },
          {
            name: "→",
            render: (row) => (
              <Flex down>
                <div>{row.transformation}</div>
                <div>{KanaUtils.toRomaji(row.transformation)}</div>
              </Flex>
            ),
          },
          {
            name: "Te-form",
            render: (row) => (
              <Flex down>
                <Highlighter
                  highlightStyle={{
                    filter: "brightness(1.5)",
                  }}
                  searchWords={[row.transformation.replace("-", "")]}
                  textToHighlight={row.teForm}
                />
                <Highlighter
                  highlightStyle={{
                    filter: "brightness(1.5)",
                  }}
                  searchWords={[
                    KanaUtils.toRomaji(row.transformation).replace("-", ""),
                  ]}
                  textToHighlight={KanaUtils.toRomaji(row.teForm)}
                />
              </Flex>
            ),
          },
        ]}
        cellStyle={(_, _2, idx) => {
          // ichidan
          if (idx === 0) {
            return {
              borderBottom: "1px solid lightgray",
              color: "oklch(0.5 0.1 250)",
            };
          }

          // godan
          if (idx < 6) {
            return {
              borderBottom: idx === 5 ? "1px solid lightgray" : undefined,
              color: "oklch(0.5 0.1 150)",
            };
          }

          return {
            color: "oklch(0.5 0.1 50)",
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
      <br />
      <br />
      <br />
      <br />
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
