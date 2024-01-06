import { Flex } from "@src/common/flex/flex";
import { PropsWithChildren, useEffect, useState } from "react";

import "@src/common/anim/anim.scss";

export function Anim(props: PropsWithChildren<{ duration: number }>) {
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!play) return;

    const interval = setInterval(() => {
      setProgress((progress) =>
        progress >= 1 ? 0 : progress + 1 / props.duration / 100
      );
    }, 10);

    return () => clearInterval(interval);
  }, [play, setProgress, props.duration]);

  return (
    <Flex
      down
      slim
      itemsPlacement="center"
      className="anim"
      style={{
        "--anim-delay": `-${progress * props.duration - 0.0001}s`,
        "--anim-duration": props.duration + "s",
        "--anim-state": "paused", // manually controlled with negative delay
      }}
    >
      {props.children}
      <Flex right>
        <button style={{ width: 60 }} onClick={() => setPlay(!play)}>
          {play ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          value={progress}
          step="0.0001"
          onChange={(evt) => setProgress(evt.target.valueAsNumber)}
        />
      </Flex>
    </Flex>
  );
}
