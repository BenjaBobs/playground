import { Anim } from "@src/common/anim/Anim";
import { ContentBox } from "@src/common/context-box/ContextBox";
import { Flex } from "@src/common/flex/flex";
import { Grid, GridItem } from "@src/common/grid/Grid";

import "@src/japanese/systems/SystemsOverview.scss";

export function SystemsOverview() {
  return (
    <ContentBox>
      <h1>Verbs</h1>
      <h2>Te-form</h2>

      <div>
        <p>Example of taberu</p>
        <Anim duration={3}>
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
        </Anim>
        <p>Example of au</p>{" "}
        <Anim duration={3}>
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
        </Anim>
      </div>

      <Grid columns={["1fr", "1fr", "1fr"]} rows={["auto", "auto", "auto"]}>
        <GridItem at={[1, 1]}>Ru-verb</GridItem>
        <GridItem at={[2, 1]}>ru -{">"} te</GridItem>
        <GridItem at={[3, 1]}>taberu -{">"} tabete</GridItem>
        <GridItem at={[1, 2]}>U-verb</GridItem>
        <GridItem at={[2, 2]}>u -{">"} tte</GridItem>
        <GridItem at={[3, 2]}>au -{">"} atte</GridItem>
        <GridItem at={[1, 3]}>Irregular</GridItem>
        <GridItem at={[2, 3]}>kuru -{">"} kite</GridItem>
        <GridItem at={[3, 3]}>suru -{">"} shite</GridItem>
      </Grid>
      <h1>Adjectives</h1>
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

function Kana(props: { kana: string; romaji: string }) {
  return (
    <Flex down slim>
      <span>{props.kana}</span>
      <span>{props.romaji}</span>
    </Flex>
  );
}
