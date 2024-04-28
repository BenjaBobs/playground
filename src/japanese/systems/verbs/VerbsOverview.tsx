import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { useDevice } from "@src/common/hooks/useDeviceSize";
import { Table } from "@src/common/table/Table";
import { Md } from "@src/common/txt/Md";

export const VerbColors = {
  godan: "oklch(0.5 0.1 150)",
  ichidan: "oklch(0.5 0.1 250)",
  irregular: "oklch(0.5 0.1 50)",
} as const;

export function VerbsOverview() {
  const device = useDevice();

  console.log(device);

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
        ichidanExample: string;
        ichidanKeigoExample?: string;
        godanExample: string;
        godanKeigoExample?: string;
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
            // padding: colIdx === 0 ? 0 : undefined,
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
                <Md text={row.ichidanExample} />
                {row.ichidanKeigoExample && (
                  <Flex
                    down
                    center
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    <Md text={row.ichidanKeigoExample} />
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
                <Md text={row.godanExample} />
                {row.godanKeigoExample && (
                  <Flex
                    down
                    center
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    <Md text={row.godanKeigoExample} />
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
                  <Md text={row.irregularSuru} />
                  <Md text={row.irregularKeigoSuru} />
                </Flex>
                <Flex down center style={{ fontStyle: "italic", opacity: 0.8 }}>
                  <Md text={row.irregularKuru} />
                  <Md text={row.irregularKeigoKuru} />
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
            ichidanKeigoExample: "食べ~る~**ます**",
            godanExample: "話す",
            godanKeigoExample: "話します",
            irregularSuru: "する",
            irregularKuru: "くる",
            irregularKeigoSuru: "します",
            irregularKeigoKuru: "きます",
          },
          {
            name: "Present / Future negative tense",
            description:
              "Used to describe a current or future action, but with a negative meaning",
            ichidanExample: "食べない",
            ichidanKeigoExample: "食べません",
            godanExample: "話さない",
            godanKeigoExample: "話しません",
            irregularSuru: "しない",
            irregularKuru: "こない",
            irregularKeigoSuru: "しません",
            irregularKeigoKuru: "きません",
          },
          {
            name: "Past tense",
            description: "Used to describe a past action",
            ichidanExample: "食べた",
            ichidanKeigoExample: "食べました",
            godanExample: "話した",
            godanKeigoExample: "話しました",
            irregularSuru: "した",
            irregularKuru: "きた",
            irregularKeigoSuru: "しました",
            irregularKeigoKuru: "きました",
          },
          {
            name: "Past negative tense",
            description:
              "Used to describe a past action, but with a negative meaning",
            ichidanExample: "食べなかった",
            ichidanKeigoExample: "食べませんでした",
            godanExample: "話さなかった",
            godanKeigoExample: "話しませんでした",
            irregularSuru: "しなかった",
            irregularKuru: "こなかった",
            irregularKeigoSuru: "しませんでした",
            irregularKeigoKuru: "きませんでした",
          },
          {
            name: "Te form",
            description: "Used for connecting verbs or for making requests",
            ichidanExample: "食べて",
            ichidanKeigoExample: "食べまして",
            godanExample: "話して",
            godanKeigoExample: "話しまして",
            irregularSuru: "して",
            irregularKuru: "きて",
            irregularKeigoSuru: "しまして",
            irregularKeigoKuru: "きまして",
          },
          {
            name: "Tai form",
            description: "Used to express desire to do something",
            ichidanExample: "食べたい",
            ichidanKeigoExample: "食べたいです",
            godanExample: "話したい",
            godanKeigoExample: "話したいです",
            irregularSuru: "したい",
            irregularKuru: "きたい",
          },
          {
            name: "Volitional form",
            description: "Used to express intention or determination",
            ichidanExample: "食べよう",
            ichidanKeigoExample: "食べましょう",
            godanExample: "話そう",
            godanKeigoExample: "話しましょう",
            irregularSuru: "しよう",
            irregularKuru: "こよう",
            irregularKeigoSuru: "しましょう",
            irregularKeigoKuru: "きましょう",
          },
          {
            name: "Imperative form",
            description: "Used to give commands",
            ichidanExample: "食べろ",
            godanExample: "話せ",
            irregularSuru: "しろ",
            irregularKuru: "こい",
          },
          {
            name: "Passive form",
            description: "Used to describe an action being done to the subject",
            ichidanExample: "食べられる",
            godanExample: "話される",
            irregularSuru: "される",
            irregularKuru: "こられる",
          },
          {
            name: "Conditional form",
            description: "Used to describe a hypothetical situation",
            ichidanExample: "食べたら",
            godanExample: "話したら",
            irregularSuru: "したら",
            irregularKuru: "きたら",
          },
          {
            name: "Provisional Conditional form",
            description: "Used to describe a tentative or uncertain situation",
            ichidanExample: "食べれば",
            godanExample: "話せば",
            irregularSuru: "すれば",
            irregularKuru: "くれば",
          },
          {
            name: "Causative form",
            description: "Used to describe causing someone to do something",
            ichidanExample: "食べさせる",
            godanExample: "話させる",
            irregularSuru: "させる",
            irregularKuru: "こさせる",
          },
          {
            name: "Potential form",
            description: "Used to describe ability to do something",
            ichidanExample: "食べられる",
            godanExample: "話せる",
            irregularSuru: "できる",
            irregularKuru: "こられる",
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
