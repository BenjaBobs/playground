import { Crocheting } from "@src/crocheting/Crocheting";
import { RouteDefinition } from "@src/shared/navigation/sitemap";

export const CrochetingSiteMap = {
  menu: { name: "crocheting" },
  element: <Crocheting />,
} satisfies RouteDefinition;
