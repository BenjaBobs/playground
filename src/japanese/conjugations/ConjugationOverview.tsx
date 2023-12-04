import { ContentBox } from "@src/common/context-box/ContextBox";
import { Grid, GridItem } from "@src/common/grid/Grid";

export function ConjugationOverview() {
  return (
    <ContentBox>
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
    </ContentBox>
  );
}
