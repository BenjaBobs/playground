import { Box, Center } from "@chakra-ui/react";
import { TowersOfBabylon } from "@src/mythic-heroes/towers-of-babylon/TowersOfBabylon";

export function MythicHeroes() {
  return (
    <Box bg="#fff5d9" w="full">
      <Center>
        <h1>Mythic heroes stuff</h1>
        <br />
        <TowersOfBabylon />
      </Center>
    </Box>
  );
}
