import { Nav } from "@src/shared/navigation/Nav";
import { PropsWithChildren } from "react";

export function Route(props: PropsWithChildren<{ path: string }>) {
  return Nav.isCurrentPath(props.path) ? props.children : null;
}
