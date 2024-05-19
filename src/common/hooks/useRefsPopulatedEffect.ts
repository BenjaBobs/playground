import { useRef } from "react";
import { EffectCallback, useEffect } from "react";

export function useRefsPopulatedEffect(
  callback: EffectCallback,
  refs: React.MutableRefObject<any>[]
) {
  const refData = useRef({
    intervalIdx: 0,
    effectRan: false,
    cleanup: (() => {}) as ReturnType<EffectCallback>,
  });

  useEffect(() => {
    if (!refData.current.effectRan) {
      refData.current.intervalIdx = setInterval(() => {
        if (!refData.current.effectRan && refs.every((ref) => ref.current)) {
          refData.current.cleanup = callback();
          refData.current.effectRan = true;
          clearInterval(refData.current.intervalIdx);
        }
      }, 1);
    }

    return () => {
      clearInterval(refData.current.intervalIdx);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      refData.current.cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
