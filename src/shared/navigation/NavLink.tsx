import { Link } from "@src/shared/navigation/Link";
import { Nav } from "@src/shared/navigation/Nav";
import { CSSProperties, PropsWithChildren } from "react";

export function NavLink(
  props: PropsWithChildren<{
    style?: (isMatch: boolean) => CSSProperties | undefined;
    className?: (isMatch: boolean) => string | undefined;
    to: string;
  }>
) {
  const isMatch = Nav.isMatchPartial(props.to);

  return (
    <Link
      style={props.style?.(isMatch)}
      className={props.className?.(isMatch)}
      to={props.to}
    >
      {props.children}
    </Link>
  );
}
