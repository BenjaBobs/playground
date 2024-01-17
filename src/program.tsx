import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  matchPath,
  redirect,
  useMatch,
} from "react-router-dom";
import { NavMenu } from "@src/nav-menu";
import React from "react";
import ReactDOM from "react-dom/client";

import.meta.glob("./utils/extensions/*.ts", {
  eager: true,
});

// eslint-disable-next-line no-restricted-imports
import "./program.scss";
import { RouteBranch, RouteDefinition, siteMap } from "@src/sitemap";

const root =
  document.getElementById("root") ??
  document.body.appendChild(document.createElement("div"));
root.id = "root";

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavMenu />
      <SiteRouter key="siteMap" branch={siteMap} />
    </BrowserRouter>
  </React.StrictMode>
);

function SiteRouter(props: { branch: RouteBranch; parent?: RouteDefinition }) {
  return (
    <Routes>
      {Object.values(props.branch).map((route) => (
        <Route
          key={route.relativePath}
          path={route.relativePath}
          element={<RenderRoute route={route} />}
          loader={async () => {
            console.log("loading", route.relativePath);
            if (!route.element && route.nested)
              return redirect(Object.values(route.nested)[0].fullPath!);
          }}
        >
          {route.nested && (
            <Route path="*" element={<SiteRouter branch={route.nested} />} />
          )}
        </Route>
      ))}
      <Route key="404" path="*" element={<div>Nothing to see here.</div>} />
    </Routes>
  );
}

function RenderRoute(props: { route: RouteDefinition }) {
  const isMatch = useMatch({ path: props.route.fullPath!, end: false });
  const isFullMatch = useMatch({ path: props.route.fullPath!, end: true });

  if (isMatch && !isFullMatch) return <Outlet />;

  if (isFullMatch && !props.route.element && props.route.nested) {
    return <Navigate to={Object.values(props.route.nested)[0].relativePath!} />;
  }

  return props.route.element ?? <Outlet />;
}
