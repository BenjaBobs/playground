import { PropsWithChildren } from "react";
import "./ContentBox.scss";

export function ContentBox(props: PropsWithChildren) {
  return <div className="content-box">{props.children}</div>;
}
