import { MouseEventHandler, PropsWithChildren } from "react";
import "@src/common/flex/flex.css";

export function Flex(
  props: PropsWithChildren<{
    onClick?: MouseEventHandler<HTMLDivElement>;
    onContextMenu?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    dir: "up" | "down" | "left" | "right";
    justify?: React.CSSProperties["justifyContent"];
    itemsSizing?: "even";
    itemsPlacement?: "center";
    gap?: number | `${number}%`;
  }>
) {
  return (
    <div
      style={{
        gap: props.gap,
      }}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
      className={`flex dir-${props.dir} just-${props.justify} items-sizing-${props.itemsSizing} items-placement-${props.itemsPlacement} ${props.className}`}
    >
      {props.children}
    </div>
  );
}
