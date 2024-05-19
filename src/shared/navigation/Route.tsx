import { Nav } from "@src/shared/navigation/Nav";
import { PropsWithChildren } from "react";

export function Route(props: PropsWithChildren<{ path: string }>) {
  const path = Nav.path;
  const expectedPath = props.path.trimEnd("/");
  const shouldRender = path.endsWith(expectedPath);

  console.log("Route", { path, expectedPath, shouldRender });

  return shouldRender ? props.children : null;
}
