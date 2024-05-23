import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";

import "@src/utils/extensions/Array";
import "@src/utils/extensions/String";

import "@src/program.scss";
import { Beyond } from "react-beyond";
import { observer } from "mobx-react-lite";
import { hoc } from "@react-beyond/hoc";
import { Nav } from "@src/shared/navigation/Nav";

import { NavMenu } from "@src/shared/navigation/nav-menu";
import { SiteRouter } from "@src/shared/navigation/sitemap";

const root =
  document.getElementById("root") ??
  document.body.appendChild(document.createElement("div"));
root.id = "root";

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Beyond features={[hoc(observer)]}>
      <RouteToClass>
        <NavMenu />
        <SiteRouter />
      </RouteToClass>
    </Beyond>
  </React.StrictMode>
);

function RouteToClass(props: PropsWithChildren) {
  const pathParts = Nav.path
    .trim("/")
    .split("/")
    .filter((p) => p)
    .slice(1);

  // assemble each path part with the previous ones
  const classNames = [];
  let cumulativeClassName = "";
  for (let i = 0; i < pathParts.length; i++) {
    const currentClassName = cumulativeClassName + "/" + pathParts[i];
    cumulativeClassName = currentClassName;
    classNames.push(currentClassName);
  }

  return <div className={classNames.join(" ")}>{props.children}</div>;
}
