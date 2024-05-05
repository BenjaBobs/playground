import {
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import "@src/common/windows/wdw/Wdw.scss";

export function Wdw(
  props: PropsWithChildren<{
    keyframes?: Keyframe[];
    open?: boolean;
  }>
) {
  const divRef = useRef<HTMLDivElement>(null);
  const rerender = useReducer((x) => !x, true)[1];

  const animator = useMemo(
    () =>
      divRef.current
        ? new WdwAnimator(divRef.current, rerender, props.keyframes)
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [divRef.current]
  );

  useEffect(() => {
    return () => {
      animator?.dispose();
    };
  }, [animator]);

  useEffect(() => {
    if (props.open) {
      animator?.open();
    } else {
      animator?.close();
    }
  }, [props.open, animator]);

  return (
    <div ref={divRef} className="wdw">
      <div className="wdw-content">
        {animator && animator.currentState !== "closed" && props.children}
      </div>
    </div>
  );
}

class WdwAnimator {
  public currentState: "open" | "opening" | "closing" | "closed" = "closed";
  private _anim: Animation | null = null;

  constructor(
    readonly _div: HTMLDivElement,
    readonly _rerender: () => void,
    readonly _keyframes?: Keyframe[]
  ) {
    if (!this._div) throw new Error("No div");
  }

  public open() {
    if (this.currentState === "open" || this.currentState === "opening") return;

    this.ensureAnimation();

    this.currentState = "opening";
    this._rerender();
    this._anim!.playbackRate = 1;

    if (this._anim?.playState !== "running") this._anim!.play();
  }

  public close() {
    if (this.currentState === "closed" || this.currentState === "closing")
      return;

    this.ensureAnimation();

    this.currentState = "closing";
    this._anim!.playbackRate = -1;

    if (this._anim?.playState !== "running") this._anim!.play();
  }

  public dispose() {
    this._anim?.cancel();
  }

  private ensureAnimation() {
    if (this._anim) return;

    this._anim = this._div.animate(
      this._keyframes ?? [
        { transform: "scale(0, 0)", offset: 0 },
        { transform: "scale(0.1, 0.5)", offset: 0.3 },
        { transform: "scale(0.1, 1)", offset: 0.7 },
        { transform: "scale(1, 1)", offset: 1 },
      ],
      { duration: 200, easing: "ease", fill: "both" }
    );
    this._anim.pause();
    this._anim.currentTime = 0;

    this._anim.onfinish = () => {
      if (this._anim!.playbackRate > 0) {
        this.currentState = "open";
        this._rerender();
      } else {
        this.currentState = "closed";
        this._rerender();
      }
    };
  }
}
