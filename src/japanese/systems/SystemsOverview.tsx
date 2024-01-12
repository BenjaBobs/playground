import { Anim, Animator } from "@src/common/anim/Animator";
import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { Stack } from "@src/common/stack/Stack";
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
          <Anim
            setup={(x) => [
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
            <Flex right>
              <Kana kana="た" romaji="ta" />
              <Kana kana="べ" romaji="be" />
              <Stack>
                <Kana kana="る" romaji="ru" />
                <Kana kana="て" romaji="te" />
              </Stack>
            </Flex>
          </Anim>
        </Animator>
        <p>Example of au</p>
        <Animator>
          <Anim
            setup={(x) => [
              {
                target: [x.querySelector(".kana-u")!],
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
                target: [x.querySelector(".kana--tte")!],
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
            <Flex right>
              <Kana kana="あ" romaji="a" />
              <Stack>
                <Kana kana="う" romaji="u" />
                <Kana kana="って" romaji="-tte" />
              </Stack>
            </Flex>
          </Anim>
        </Animator>
        <p>Example of kuru</p>
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
