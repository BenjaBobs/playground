import { Flex } from "@src/common/flex/flex";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import "@src/common/anim/Animator.scss";
import { useEffectRefsPopulated } from "@src/common/hooks/useEffectRefsPopulated";

type AnimationContext = {
  mode: "pause" | "play" | "repeat";
  progress: number;
  duration: number;
};

const animContext = createContext<AnimationContext>({
  mode: "pause",
  progress: 0,
  duration: 0,
});

export function Animator(props: PropsWithChildren<{ duration?: number }>) {
  const duration = props.duration ?? 3;
  const [mode, setMode] = useState<"pause" | "play" | "repeat">("pause");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (mode === "pause") return;

    const interval = setInterval(() => {
      setProgress((progress) => {
        const newProgress = Math.min(1, progress + 1 / duration / 100);

        return newProgress >= 1 && mode === "repeat" ? 0 : newProgress;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [mode, setProgress, duration]);

  return (
    <animContext.Provider value={{ mode, progress, duration }}>
      <Flex
        down
        slim
        itemsPlacement="center"
        className="animator"
        style={{
          "--anim-delay": `-${progress * duration - 0.0001}s`,
          "--anim-duration": duration + "s",
          "--anim-state": "paused", // manually controlled with negative delay
        }}
      >
        {props.children}
        <Flex right>
          <button
            style={{ width: 60 }}
            onClick={() =>
              setMode((old) =>
                old === "pause" ? "play" : old === "play" ? "repeat" : "pause"
              )
            }
          >
            {mode === "pause" ? "Play" : mode === "play" ? "Repeat" : "Stop"}
          </button>
          <span style={{ width: 40 }}>{(progress * 100).toFixed()}%</span>
          <input
            type="range"
            min="0"
            max="1"
            value={progress}
            step="0.0001"
            onChange={(evt) => setProgress(evt.target.valueAsNumber)}
          />
          <span>
            {(progress * duration).toFixed(1)}s / {duration}s
          </span>
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
      fill?: "forwards" | "backwards" | "both" | "none";
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
        const accumulatedEndFrame: Keyframe = {
          ...setup.keyframes.reduce(
            (accum, next) => ({ ...accum, ...next }),
            {}
          ),
          offset: 1,
        };

        const patchedFrames = [
          ...setup.keyframes.filter((frame) => frame.offset !== 1),
          accumulatedEndFrame,
        ];

        console.log(patchedFrames);

        const animation = target.animate(patchedFrames, {
          fill: "forwards",
          duration: animationState.duration * 1000,
        });

        if (animationState.mode !== "pause") {
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
    if (animationState.mode !== "pause") {
      anims.current?.forEach((anim) => anim.play());
    } else {
      anims.current?.forEach((anim) => anim.pause());
    }
  }, [animationState.mode]);

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
    <div ref={selfRef} className="anim">
      {props.children}
    </div>
  );
}
