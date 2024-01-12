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
import { useCallback } from "react";

type AnimationContext = {
  duration: number;
  animations: Animation[];
};

const animContext = createContext<AnimationContext>({
  duration: 3,
  animations: [],
});

export function Animator(props: PropsWithChildren<{ duration?: number }>) {
  const animationState = useRef<AnimationContext>({
    duration: props.duration ?? 3,
    animations: [],
  });

  return (
    <animContext.Provider value={animationState.current}>
      <Flex down slim itemsPlacement="center" className="animator">
        {props.children}
        <AnimationControls />
      </Flex>
    </animContext.Provider>
  );
}

function AnimationControls() {
  const [play, setPlay] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const animationState = useContext(animContext);

  const stopAnimations = useCallback(() => {
    setPlay(false);
    animationState.animations.forEach((anim) => anim.pause());
  }, [setPlay, animationState.animations]);

  function startAnimations() {
    setPlay(true);
    if (progress === 1) setProgress(0);
    animationState.animations.forEach((anim) => anim.play());
  }

  useEffect(() => {
    if (!play) return;

    const interval = setInterval(() => {
      setProgress((progress) => {
        const newProgress = Math.min(
          1,
          progress + 1 / animationState.duration / 100
        );

        if (newProgress === 1) stopAnimations();

        return newProgress;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [play, setProgress, stopAnimations, animationState.duration]);

  function onPlayButtonClicked() {
    if (play) stopAnimations();
    else startAnimations();
  }

  return (
    <Flex right>
      <button style={{ width: 60 }} onClick={onPlayButtonClicked}>
        {play ? "Pause" : "Play"}
      </button>
      <span style={{ width: 40 }}>{(progress * 100).toFixed()}%</span>
      <input
        type="range"
        min="0"
        max="1"
        value={progress}
        step="0.0001"
        onChange={(evt) => {
          setProgress(evt.target.valueAsNumber);
          animationState.animations.forEach(
            (anim) =>
              (anim.currentTime =
                evt.target.valueAsNumber * animationState.duration * 1000)
          );
        }}
      />
      <span>
        {(progress * animationState.duration).toFixed(1)}s /{" "}
        {animationState.duration}s
      </span>
    </Flex>
  );
}

export function Anim(
  props: PropsWithChildren<{
    setup: (elem: HTMLElement) => {
      target: Element[] | NodeList;
      keyframes: Keyframe[];
      fill?: "forwards" | "backwards" | "both" | "none";
      easing?: "ease-in-out" | "ease-in" | "ease-out" | "linear";
    }[];
  }>
) {
  const selfRef = useRef<HTMLDivElement>(null);
  const animationState = useContext(animContext);

  useEffectRefsPopulated(() => {
    const setups = props.setup(selfRef.current!);

    const anims = setups
      .flatMap((setup) =>
        [...setup.target].map((target) => {
          if (!(target instanceof HTMLElement)) return null;

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

          const animation = target.animate(patchedFrames, {
            fill: "forwards",
            duration: animationState.duration * 1000,
          });

          animation.pause();

          return animation;
        })
      )
      .filter((x) => x !== null) as Animation[];

    animationState.animations.push(...anims);

    return () => {
      const animIndices = anims
        .map((anim) => animationState.animations.indexOf(anim))
        .orderBy((x) => x, "desc");

      for (const animIndex of animIndices) {
        if (animIndex === -1) continue;
        animationState.animations.splice(animIndex, 1);
      }

      anims.forEach((anim) => anim.cancel());
    };
  }, [selfRef.current]);

  return (
    <div ref={selfRef} className="anim">
      {props.children}
    </div>
  );
}
