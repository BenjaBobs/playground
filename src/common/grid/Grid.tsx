import { CSSProperties, PropsWithChildren } from "react";

type CSSLength =
  | number
  | `${number}%`
  | `${number}px`
  | `${number}em`
  | `${number}rem`;

type GridDimension =
  | CSSLength
  | "auto"
  | "min-content"
  | "max-content"
  | "fit-content"
  | "minmax(auto, auto)"
  | `${number}fr`;

export function Grid(
  props: PropsWithChildren<{
    columns: GridDimension[];
    rows: GridDimension[];
    gap?: number | [number, number];
  }>
) {
  const gap = Array.isArray(props.gap)
    ? props.gap
    : [props.gap ?? 0, props.gap ?? 0];

  const style: CSSProperties = {
    display: "grid",
    gridTemplateColumns: props.columns.join(" "),
    gridTemplateRows: props.rows.join(" "),
    gap: `${gap[0]}px ${gap[1]}px`,
  };

  return (
    <div style={style} className="grid">
      {props.children}
    </div>
  );
}

export function GridItem(
  props: PropsWithChildren<{
    at: [number, number];
    to?: [number, number];
    className?: string;
    style?: CSSProperties;
  }>
) {
  const style: CSSProperties = {
    gridColumn: `${props.at[0]} / ${props.to?.[0] ?? props.at[0]}`,
    gridRow: `${props.at[1]} / ${props.to?.[1] ?? props.at[1]}`,
    ...props.style,
  };

  return (
    <div style={style} className={`grid-item ${props.className}`}>
      {props.children}
    </div>
  );
}
