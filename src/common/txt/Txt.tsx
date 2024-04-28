import { CSSProperties, PropsWithChildren } from "react";

export function Txt(
  props: PropsWithChildren<{ color?: CSSProperties["color"] }>
) {
  return <span style={{ color: props.color }}>{props.children}</span>;
}
