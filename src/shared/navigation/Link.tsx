import { useDevice } from "@src/common/hooks/useDeviceSize";
import { Nav } from "@src/shared/navigation/Nav";
import { CSSProperties, PropsWithChildren, useRef } from "react";

export function Link(
  props: PropsWithChildren<{
    style?: CSSProperties;
    className?: string;
    to: string;
    onClick?: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
    preventMobileInstaClick?: boolean;
  }>
) {
  const device = useDevice();
  const data = useRef<{ hoveredAt: number }>({ hoveredAt: 0 });

  return (
    <a
      className={props.className}
      style={props.style}
      href={props.to}
      onMouseEnter={
        device === "mobile"
          ? () => {
              data.current.hoveredAt = new Date().getTime();
            }
          : undefined
      }
      onMouseLeave={
        device === "mobile"
          ? () => {
              data.current.hoveredAt = 0;
            }
          : undefined
      }
      onClick={(evt) => {
        if (evt.isPropagationStopped() && evt.isDefaultPrevented()) return;
        evt.preventDefault();
        evt.stopPropagation();

        if (
          device === "mobile" &&
          props.preventMobileInstaClick &&
          new Date().getTime() - data.current.hoveredAt < 100
        ) {
          return;
        }

        Nav.path = props.to;
      }}
    >
      {props.children}
    </a>
  );
}
