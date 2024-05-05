import { Flex } from "@src/common/flex/flex";
import { RouteBranch, RouteDefinition, siteMap } from "@src/sitemap";
import { NavLink, matchPath, useLocation, useMatch } from "react-router-dom";
import "@src/nav-menu.scss";

export function NavMenu() {
  // needed to force a re-render when the location changes
  // otherwise the available menu items don't update
  useLocation();

  return <NavMenuRow branch={siteMap} />;
}

function NavMenuRow(props: { branch: RouteBranch }) {
  const matchingRoute = Object.values(props.branch)
    .orderBy((x) => x.relativePath?.length, "desc")
    .find((route) =>
      matchPath({ path: route.fullPath!, end: false }, window.location.pathname)
    );

  return (
    <div className="hide-in-print">
      <Flex right itemsPlacement="center">
        {Object.values(props.branch).map(({ menu, fullPath }) => (
          <NavMenuItem key={fullPath!} fullPath={fullPath!} menu={menu!} />
        ))}
      </Flex>
      {matchingRoute?.nested && <NavMenuRow branch={matchingRoute.nested} />}
    </div>
  );
}

function NavMenuItem(props: {
  menu: RouteDefinition["menu"];
  fullPath: string;
}) {
  const isMatch = useMatch({ path: props.fullPath, end: false });

  return (
    <Flex
      slim
      center
      gap={4}
      className={`nav-menu-item ${isMatch ? "active" : ""}`}
    >
      <NavLink to={props.fullPath as string}>{props.menu?.name}</NavLink>
      {props.menu?.extra}
    </Flex>
  );
}
