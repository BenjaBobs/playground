import { PropsWithChildren } from "react";

import "@src/common/stack/Stack.scss";

export function Stack(props: PropsWithChildren) {
  return <div className="stack">{props.children}</div>;
}
