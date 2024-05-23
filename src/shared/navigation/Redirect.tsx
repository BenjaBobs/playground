import { Nav } from "@src/shared/navigation/Nav";

export function Redirect(props: { to: string }) {
  Nav.replacePath(props.to);

  return null;
}
