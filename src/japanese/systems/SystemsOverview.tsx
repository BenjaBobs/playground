import { Anim, Animator } from "@src/common/anim/Animator";
import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { KanaTable } from "@src/japanese/kana-table/KanaTable";

import "@src/japanese/systems/SystemsOverview.scss";
import React from "react";

export function SystemsOverview() {
  return (
    <ContentBox>
      <h1>Verbs</h1>
      <h2>Te-form</h2>

      <div>
        <p>Example of taberu</p>
        <Animator>
          <WordAnim
            stub={
              <>
                <Kana kana="た" romaji="ta" />
                <Kana kana="べ" romaji="be" />
              </>
            }
            stubSuffix={<Kana kana="る" romaji="ru" />}
            teSuffix={<Kana kana="て" romaji="te" />}
          />
        </Animator>
        <p>Example of au</p>
        <Animator>
          <WordAnim
            stub={<Kana kana="あ" romaji="a" />}
            stubSuffix={<Kana kana="う" romaji="u" />}
            teSuffix={
              <>
                <Kana kana="っ" romaji="-t" />
                <Kana kana="て" romaji="te" />
              </>
            }
          />
        </Animator>
        <p>Example of kuru</p>
        <Animator duration={5}>
          <Flex right>
            <Anim
              setup={(x) => [
                {
                  target: [x.querySelector(".kana-ku")!],
                  easing: "ease-out",
                  keyframes: [
                    { offset: 0, opacity: 1, translate: "0% 0%" },
                    { offset: 0.1, color: "red" },
                    {
                      offset: 0.5,
                      opacity: 0,
                      translate: "0% -150%",
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
                  target: [x.querySelector(".kana-ki")!],
                  easing: "ease-out",
                  keyframes: [
                    {
                      offset: 0,
                      opacity: 0,
                      translate: "-150% 0%",
                      color: "green",
                    },
                    {
                      offset: 0.5,
                      opacity: 1,
                      translate: "0% 0%",
                    },
                    {
                      offset: 1,
                      opacity: 1,
                      translate: "0% 0%",
                      color: "black",
                    },
                  ],
                },
                {
                  target: [x.querySelector(".kana-ru")!],
                  keyframes: [
                    { offset: 0, opacity: 1, translate: "0% 0%" },
                    { offset: 0.5, opacity: 1, translate: "0% 0%" },
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
                    { offset: 0.5, opacity: 0, translate: "150% 0%" },
                    { offset: 1, opacity: 1, translate: "0% 0%" },
                  ],
                },
              ]}
            >
              <Kana kana="く" romaji="ku" />
              <Kana kana="き" romaji="ki" replacement />
              <Kana kana="る" romaji="ru" />
              <Kana kana="て" romaji="te" replacement />
            </Anim>
            <div
              style={{
                position: "absolute",
                width: 200,
                fontSize: 2,
                translate: "100% -50%",
              }}
            >
              <Anim
                setup={(x) => [
                  {
                    target: [x.querySelector(".kana-table")!],
                    keyframes: [
                      { offset: 0, opacity: 0 },
                      { offset: 0.05, opacity: 1 },
                      { offset: 0.45, opacity: 1 },
                      { offset: 1, opacity: 0 },
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
                    target: [
                      ...x.querySelectorAll(".row-1.col-u .kana-cell-ghost"),
                    ],
                    keyframes: [
                      {
                        offset: 0,
                        opacity: 0.5,
                        backgroundColor: "red",
                        translate: "0% 0%",
                      },
                      {
                        offset: 0.25,
                        translate: "-50% -1em",
                      },
                      {
                        offset: 0.5,
                        opacity: 0.5,
                        backgroundColor: "green",
                        translate: "calc(-100% - 0.9em) 0%",
                      },
                      {
                        offset: 1,
                        opacity: 0.1,
                        backgroundColor: "green",
                        translate: "calc(-100% - 0.9em) 0%",
                      },
                    ],
                  },
                ]}
              >
                <KanaTable />
              </Anim>
            </div>
          </Flex>
        </Animator>
      </div>
    </ContentBox>
  );
}

function WordAnim(props: {
  stub: React.ReactNode;
  stubSuffix: React.ReactNode;
  teSuffix: React.ReactNode;
}) {
  return (
    <Flex right slim>
      {props.stub}
      <span>
        <span className="te-form-stub-suffix">{props.stubSuffix}</span>
        <span className="te-form-te-suffix">
          <Flex right slim itemsPlacement="center">
            {props.teSuffix}
          </Flex>
        </span>
      </span>
    </Flex>
  );
}

function Kana(props: { kana: string; romaji: string; replacement?: boolean }) {
  return (
    <Flex
      down
      slim
      className={"kana-" + props.romaji}
      style={{ marginLeft: props.replacement ? "-25%" : undefined }}
    >
      <span>{props.kana}</span>
      <span>{props.romaji}</span>
    </Flex>
  );
}
