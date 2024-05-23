import { makeAutoObservable } from "mobx";

class NavImpl {
  private current = window.location.pathname.trim("/");

  constructor() {
    makeAutoObservable(this);

    history.pushState = new Proxy(history.pushState, {
      apply: (target, thisArg, argArray) => {
        const result = target.apply(thisArg, argArray as any);
        this.current = window.location.pathname.trim("/");
        return result;
      },
    });

    history.replaceState = new Proxy(history.replaceState, {
      apply: (target, thisArg, argArray) => {
        const result = target.apply(thisArg, argArray as any);
        this.current = window.location.pathname.trim("/");
        return result;
      },
    });
  }

  public get path() {
    return this.current;
  }

  public set path(value: string) {
    history.pushState(null, "", value);
  }

  public replacePath(value: string) {
    if (this.current !== value.trim("/")) {
      setTimeout(() => {
        history.replaceState(null, "", value);
      }, 0);
    }
  }

  public isCurrentPath(path: string | undefined) {
    return !!path && this.current === path.trim("/");
  }

  public isStartOfCurrentPath(path: string | undefined) {
    return !!path && this.current.startsWith(path.trim("/"));
  }

  public isCurrentPathStartOf(path: string | undefined) {
    return !!path && path.trim("/").startsWith(this.current);
  }
}

export const Nav = new NavImpl();
