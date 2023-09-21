import { MouseEventHandler, PropsWithChildren } from "react";
import "@src/common/flex/flex.css";

// type OneOf<T> = {
//   [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
// }[keyof T] extends infer O ? { [K in keyof O]: O[K] } : never;

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

// type dir = "up" | "down" | "left" | "right";

// type mapped = {[key in dir]?: boolean}

// type A = OneOf<mapped>;

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
