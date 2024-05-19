import { Flex } from "@src/common/flex/flex";
import {
  RouteBranch,
  RouteDefinition,
  siteMap,
} from "@src/shared/navigation/sitemap";
import "@src/shared/navigation/nav-menu.scss";
import { Nav } from "@src/shared/navigation/Nav";
import { NavLink } from "@src/shared/navigation/NavLink";

export function NavMenu() {
  return <NavMenuRow branch={siteMap} />;
}

function NavMenuRow(props: { branch: RouteBranch }) {
  const matchingRoute = Object.values(props.branch)
    .orderBy((x) => x.relativePath?.length, "desc")
    .find((route) => Nav.isMatchPartial(route.fullPath!));

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
  const isMatch = Nav.isMatchPartial(props.fullPath);

  return (
    <Flex
      slim
      center
      gap={4}
      className={`nav-menu-item ${isMatch ? "active" : ""}`}
    >
      <NavLink to={props.fullPath}>{props.menu?.name}</NavLink>
      {props.menu?.extra}
    </Flex>
  );
}
