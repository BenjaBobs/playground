import { PropsWithChildren } from "react";
import "@src/common/context-box/ContentBox.scss";

export function ContentBox(props: PropsWithChildren) {
  return <div className="content-box">{props.children}</div>;
}
