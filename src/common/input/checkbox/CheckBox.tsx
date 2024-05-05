import { Flex } from "@src/common/flex/flex";
import { PropsWithChildren } from "react";
import "@src/common/input/checkbox/CheckBox.scss";

export function CheckBox(
  props: PropsWithChildren<{
    checked?: boolean;
    onChange?: (checked: boolean) => void;
  }>
) {
  return (
    <Flex
      right
      slim
      center
      className="checkbox-container"
      gap={4}
      onClick={() => props.onChange?.(!props.checked)}
    >
      <div className="checkbox">{props.checked ? "X" : ""}</div>
      {props.children}
    </Flex>
  );
}
