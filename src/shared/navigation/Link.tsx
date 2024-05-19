import { Nav } from "@src/shared/navigation/Nav";
import { CSSProperties, PropsWithChildren } from "react";

export function Link(
  props: PropsWithChildren<{
    style?: CSSProperties;
    className?: string;
    to: string;
  }>
) {
  return (
    <a
      style={props.style}
      href={props.to}
      onClick={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        Nav.path = props.to;
      }}
    >
      {props.children}
    </a>
  );
}
