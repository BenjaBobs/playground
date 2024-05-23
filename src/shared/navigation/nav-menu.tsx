import { Flex } from "@src/common/flex/flex";
import {
  RouteBranch,
  RouteDefinition,
  siteMap,
} from "@src/shared/navigation/sitemap";
import "@src/shared/navigation/nav-menu.scss";
import { Nav } from "@src/shared/navigation/Nav";
import { NavLink } from "@src/shared/navigation/NavLink";
import { Link } from "@src/shared/navigation/Link";

export function NavMenu() {
  return (
    <>
      <Flex right gap={4} pad={4}>
        <BreadCrumb routes={Object.values(siteMap ?? {})} />
        <CurrentAndNextOptions branch={siteMap} />
      </Flex>
    </>
  );
}

function CurrentAndNextOptions(props: { branch: RouteBranch }) {
  const matchingRoute = Object.values(props.branch)
    .orderBy((x) => x.relativePath?.length, "desc")
    .find((route) => Nav.isStartOfCurrentPath(route.fullPath!));

  const isFull = matchingRoute && Nav.isCurrentPath(matchingRoute?.fullPath);

  return (
    <>
      {isFull ? (
        <>
          {matchingRoute.nested && <span>/</span>}
          {Object.values(matchingRoute.nested ?? {})?.map((child) => (
            <Link
              className="nav-menu-option"
              key={child.fullPath!}
              to={child.fullPath!}
            >
              {child.menu?.name}
            </Link>
          ))}
        </>
      ) : matchingRoute ? (
        <>
          <span>/</span>
          <BreadCrumb routes={Object.values(matchingRoute.nested ?? {})} />
          <CurrentAndNextOptions branch={matchingRoute.nested!} />
        </>
      ) : (
        Object.values(props.branch).map((route) => (
          <NavLink
            className={(isMatch) => (isMatch ? "current" : "others")}
            key={route.fullPath}
            to={route.fullPath!}
            style={(isMatch) => ({
              background: isMatch ? "lightgrey" : undefined,
            })}
          >
            {route.menu?.name}
          </NavLink>
        ))
      )}
    </>
  );
}

function BreadCrumb(props: { routes: RouteDefinition[] }) {
  return (
    <Flex right className="nav-menu-breadcrumb">
      {props.routes.map((route) => (
        <NavLink
          className={(isMatch) =>
            isMatch ? "nav-menu-branch-taken" : "nav-menu-branch-not-taken"
          }
          key={route.fullPath}
          to={route.fullPath!}
        >
          {route.menu?.name}
        </NavLink>
      ))}
    </Flex>
  );
}
