import { Flex } from "@src/common/flex/flex";
import { PropsWithChildren } from "react";

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
      justify="center"
      onClick={() => props.onChange?.(!props.checked)}
    >
      <input readOnly checked={!!props.checked} type="checkbox" />
      {props.children}
    </Flex>
  );
}
