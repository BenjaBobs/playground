import { Flex } from "@src/common/flex/flex";
import { RouteBranch, siteMap } from "@src/sitemap";
import { NavLink, matchPath, useLocation } from "react-router-dom";

export function NavMenu() {
  useLocation();

  return <NavMenuRow branch={siteMap} />;
}

function NavMenuRow(props: { branch: RouteBranch }) {
  const matchingRoute = Object.values(props.branch).find((route) =>
    matchPath({ path: route.fullPath!, end: false }, window.location.pathname)
  );

  return (
    <div className="hide-in-print">
      <Flex right itemsPlacement="center">
        {Object.values(props.branch).map(({ menu, fullPath }) => (
          <NavLink
            key={fullPath!}
            to={fullPath!}
            style={({ isActive }) => ({
              background: isActive ? "lightgrey" : undefined,
              width: "100px",
              padding: "5px",
            })}
          >
            {menu?.name}
          </NavLink>
        ))}
      </Flex>
      {matchingRoute?.nested && <NavMenuRow branch={matchingRoute.nested} />}
    </div>
  );
}
