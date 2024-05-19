import { JapaneseSiteMap } from "@src/japanese/japanese-sitemap";
import { MythicHeroesSitemap } from "@src/mythic-heroes/mythic-heroes-sitemap";
import { Route } from "@src/shared/navigation/Route";
import version from "@src/version.txt?raw";

export const BaseRoute = "playground";

export type RouteBranch = {
  [key: string]: RouteDefinition;
};

export type RouteDefinition = {
  parent?: RouteDefinition | undefined;
  relativePath?: string;
  fullPath?: string;
  element?: JSX.Element;
  menu?: {
    name: React.ReactNode;
    extra?: React.ReactNode;
  };
  nested?: RouteBranch;
};

export const siteMap = {
  home: {
    relativePath: "home",
    menu: { name: "Home" },
    element: (
      <div>
        <span>
          Welcome to home!
          <br />
          Version: {version}
        </span>
      </div>
    ),
  },
  japanese: JapaneseSiteMap,
  mythicHeroes: MythicHeroesSitemap,
} satisfies RouteDefinition["nested"];

const siteRoutes: RouteDefinition[] = [];
enhance(siteMap);

function enhance(routeMap: RouteBranch, parent?: RouteDefinition) {
  Object.entries(routeMap).forEach(([path, route]) => {
    siteRoutes.push(route);

    route.parent = parent;
    route.relativePath = route.relativePath ?? path;

    if (!route.parent)
      route.relativePath = `${BaseRoute}/${route.relativePath}`;

    const parentPath = parent?.fullPath ?? "";
    route.fullPath = `${parentPath}/${route.relativePath}`;

    if (route.nested) {
      enhance(route.nested, route);
    }
  });
}

export function SiteRouter() {
  return (
    <>
      {Object.values(siteRoutes).map((route) => (
        <Route key={route.relativePath} path={route.fullPath!}>
          {route.element}
        </Route>
      ))}
    </>
  );
}
