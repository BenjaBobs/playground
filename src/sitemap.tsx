import { JapaneseSiteMap } from "@src/japanese/japanese-sitemap";
import { MythicHeroesSitemap } from "@src/mythic-heroes/mythic-heroes-sitemap";

export type RouteBranch = {
  [key: string]: RouteDefinition;
};

export type RouteDefinition = {
  parent?: RouteDefinition | undefined;
  relativePath?: string;
  fullPath?: string;
  element?: JSX.Element;
  menu?: {
    name: string;
  };
  nested?: RouteBranch;
};

export const siteMap = {
  home: {
    relativePath: "",
    menu: { name: "Home" },
    element: (
      <div>
        <span>Welcome to home!</span>
      </div>
    ),
  },
  japanese: JapaneseSiteMap,
  mythicHeroes: MythicHeroesSitemap,
} satisfies RouteDefinition["nested"];

enhance(siteMap as any);

function enhance(routeMap: RouteBranch, parent?: RouteDefinition) {
  Object.entries(routeMap).forEach(([path, route]) => {
    route.parent = parent;
    route.relativePath = route.relativePath ?? path;
    route.fullPath = parent
      ? `${parent.fullPath}/${route.relativePath}`
      : route.relativePath;

    if (route.nested) {
      enhance(route.nested, route);
    }
  });
}
