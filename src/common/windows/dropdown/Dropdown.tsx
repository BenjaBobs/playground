import React, { PropsWithChildren, useRef, useState } from "react";
import "@src/common/windows/dropdown/Dropdown.scss";
import { useEffectRefsPopulated } from "@src/common/hooks/useEffectRefsPopulated";

export function Dropdown(
  props: PropsWithChildren<{
    content: React.ReactNode;
    trigger?: "click" | "hover";
  }>
) {
  const trigger = props.trigger ?? "click";
  const [isOpen, setIsOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation>();

  useEffectRefsPopulated(() => {
    animationRef.current = popupRef.current!.animate(
      [
        { transform: "scale(0, 0)", offset: 0 },
        { transform: "scale(0.1, 0.5)", offset: 0.3 },
        { transform: "scale(0.1, 1)", offset: 0.7 },
        { transform: "scale(1, 1)", offset: 1 },
      ],
      { duration: 200, easing: "ease", fill: "both" }
    );
    animationRef.current.pause();
    animationRef.current.currentTime = 0;

    animationRef.current!.onfinish = () => {
      if (animationRef.current!.playbackRate > 0) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
  }, [popupRef.current]);

  const openDropdown = () => {
    if (isOpen) return;
    setIsOpen(true);

    animationRef.current!.playbackRate = 1;
    if (animationRef.current?.playState !== "running")
      animationRef.current!.play();
  };

  const closeDropdown = () => {
    if (!isOpen) return;
    animationRef.current!.playbackRate = -1;
    if (animationRef.current?.playState !== "running")
      animationRef.current!.play();
  };

  const toggleDropdown = () => {
    if (isOpen) closeDropdown();
    else openDropdown();
  };

  return (
    <div
      onClick={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      }}
      className={`dropdown`}
      onMouseEnter={() => {
        if (trigger === "hover") {
          openDropdown();
        }
      }}
      onMouseLeave={() => {
        if (trigger === "hover") {
          closeDropdown();
        }
      }}
    >
      <div
        className="dropdown-trigger"
        onClick={() => {
          if (trigger === "click") {
            toggleDropdown();
          }
        }}
      >
        {props.children}
      </div>
      <div ref={popupRef} className="dropdown-content">
        {isOpen && props.content}
      </div>
    </div>
  );
}
