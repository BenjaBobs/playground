import { marked } from "marked";
import { useMemo } from "react";

export function Md(props: { text: string | undefined }) {
  const cached = useMemo(
    () => (props.text ? marked(props.text) : undefined),
    [props.text]
  );

  return cached !== undefined ? (
    <span dangerouslySetInnerHTML={{ __html: cached }} />
  ) : null;
}
