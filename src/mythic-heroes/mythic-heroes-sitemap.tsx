import { MythicHeroes } from "@src/mythic-heroes/mythic-heroes";
import { RouteDefinition } from "src/shared/navigation/sitemap";

export const MythicHeroesSitemap = {
  menu: { name: "Mythic Heroes" },
  element: <MythicHeroes />,
} satisfies RouteDefinition;
