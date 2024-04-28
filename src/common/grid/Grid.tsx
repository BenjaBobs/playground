import { CSSProperties, PropsWithChildren } from "react";

export function Grid(
  props: PropsWithChildren<{
    style?: CSSProperties;
    className?: string;
    cols: string;
    rows?: string;
    gap?: number | [number, number];
  }>
) {
  const gap = Array.isArray(props.gap)
    ? props.gap
    : [props.gap ?? 0, props.gap ?? 0];

  const style: CSSProperties = {
    display: "grid",
    gridTemplateColumns: props.cols,
    gridTemplateRows: props.rows,
    gap: `${gap[0]}px ${gap[1]}px`,
    ...props.style,
  };

  return (
    <div style={style} className={`grid ${props.className || ""}`}>
      {props.children}
    </div>
  );
}

export function GridItem(
  props: PropsWithChildren<{
    style?: CSSProperties;
    className?: string;
    row: string;
    col: string;
    pad?: CSSProperties["padding"];
  }>
) {
  const style: CSSProperties = {
    gridColumn: props.col,
    gridRow: props.row,
    padding: props.pad,
    ...props.style,
  };

  return (
    <div style={style} className={`grid-item ${props.className}`}>
      {props.children}
    </div>
  );
}
