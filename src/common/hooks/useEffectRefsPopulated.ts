import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useEffectRefsPopulated(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }

    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
