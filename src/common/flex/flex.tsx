import { MouseEventHandler, PropsWithChildren } from "react";
import "@src/common/flex/flex.css";

export function Flex(
  props: PropsWithChildren<{
    onClick?: MouseEventHandler<HTMLDivElement>;
    onContextMenu?: MouseEventHandler<HTMLDivElement>;
    className?: string;
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
  return (
    <div
      style={{
        gap: props.gap,
        width: props.width,
      }}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
      className={`flex dir-${getDir(props)} just-${
        props.justify
      } items-sizing-${props.itemsSizing} items-placement-${
        props.itemsPlacement
      } ${props.className}`}
    >
      {props.children}
    </div>
  );
}

function getDir(object: any) {
  if (object.up) return "up";
  if (object.down) return "down";
  if (object.left) return "left";
  if (object.right) return "right";
  return "down";
}
