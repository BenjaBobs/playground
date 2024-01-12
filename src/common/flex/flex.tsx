import { MouseEventHandler, PropsWithChildren } from "react";
import "@src/common/flex/flex.scss";

export function Flex(
  props: PropsWithChildren<{
    style?: React.CSSProperties & { [key: `--${string}`]: string };
    onClick?: MouseEventHandler<HTMLDivElement>;
    onContextMenu?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    slim?: boolean;
    up?: boolean;
    down?: boolean;
    left?: boolean;
    right?: boolean;
    justify?: React.CSSProperties["justifyContent"];
    itemsSizing?: "even";
    itemsPlacement?: "center";
    gap?: number | `${number}%`;
    width?: number | `${number}%`;
  }>
) {
  const classes = [
    "flex",
    getDir(props),
    props.justify && "just-" + props.justify,
    props.itemsSizing && "items-sizing-" + props.itemsSizing,
    props.itemsPlacement && "items-placement-" + props.itemsPlacement,
    props.className,
    props.slim && "slim",
  ];

  return (
    <div
      style={{
        gap: props.gap,
        width: props.width,
        ...props.style,
      }}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
      className={classes.filter((x) => x).join(" ")}
    >
      {props.children}
    </div>
  );
}

function getDir(object: Parameters<typeof Flex>[0]) {
  if (object.up) return "dir-up";
  if (object.down) return "dir-down";
  if (object.left) return "dir-left";
  if (object.right) return "dir-right";
  return "dir-down";
}
