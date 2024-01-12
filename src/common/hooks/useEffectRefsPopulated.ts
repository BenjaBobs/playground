import { useState } from "react";
import { DependencyList, EffectCallback, useEffect } from "react";

export function useEffectRefsPopulated(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);

      return;
    }

    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
