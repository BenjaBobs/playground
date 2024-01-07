import { Flex } from "@src/common/flex/flex";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "@src/common/anim/Animator.scss";
import { useEffectRefsPopulated } from "@src/common/hooks/useEffectRefsPopulated";

type AnimationContext = {
  play: boolean;
  progress: number;
  duration: number;
};

const animContext = createContext<AnimationContext>({
  play: false,
  progress: 0,
  duration: 0,
});

export function Animator(props: PropsWithChildren<{ duration?: number }>) {
  const duration = props.duration ?? 3;
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!play) return;

    const interval = setInterval(() => {
      setProgress((progress) =>
        progress >= 1 ? 0 : progress + 1 / duration / 100
      );
    }, 10);

    return () => clearInterval(interval);
  }, [play, setProgress, duration]);

  return (
    <animContext.Provider value={{ play, progress, duration }}>
      <Flex
        down
        slim
        itemsPlacement="center"
        className="anim"
        style={{
          "--anim-delay": `-${progress * duration - 0.0001}s`,
          "--anim-duration": duration + "s",
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
    </animContext.Provider>
  );
}

export function Anim(
  props: PropsWithChildren<{
    setup: (elem: HTMLElement) => {
      target: Element[];
      keyframes: Keyframe[];
      easing?: "ease-in-out" | "ease-in" | "ease-out" | "linear";
    }[];
  }>
) {
  const selfRef = useRef<HTMLDivElement>(null);
  const animationState = useContext(animContext);

  const anims = useRef<Animation[]>();

  useEffectRefsPopulated(() => {
    const setups = props.setup(selfRef.current!);

    anims.current = setups.flatMap((setup) =>
      setup.target.map((target) => {
        const animation = target.animate(setup.keyframes, {
          duration: animationState.duration * 1000,
          iterations: Infinity,
          easing: setup.easing ?? "ease-in-out",
        });

        if (animationState.play) {
          animation.play();
        } else {
          animation.pause();
        }

        return animation;
      })
    );

    return () => {
      anims.current!.forEach((anim) => anim.cancel());
    };
  }, [selfRef.current]);

  useEffect(() => {
    if (animationState.play) {
      anims.current?.forEach((anim) => anim.play());
    } else {
      anims.current?.forEach((anim) => anim.pause());
    }
  }, [animationState.play]);

  useEffect(() => {
    anims.current?.forEach((anim) => {
      const preState = anim.playState;
      anim.currentTime =
        animationState.progress * animationState.duration * 1000 - 0.0001;

      if (preState === "paused") {
        anim.pause();
      }
    });
  }, [animationState.progress]);

  return (
    <div ref={selfRef} style={{ display: "contents" }}>
      {props.children}
    </div>
  );
}
