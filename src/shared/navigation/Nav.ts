import { makeAutoObservable } from "mobx";

class NavImpl {
  private current = window.location.pathname;

  constructor() {
    makeAutoObservable(this);

    history.pushState = new Proxy(history.pushState, {
      apply: (target, thisArg, argArray) => {
        const result = target.apply(thisArg, argArray as any);
        this.current = window.location.pathname;
        return result;
      },
    });

    history.replaceState = new Proxy(history.replaceState, {
      apply: (target, thisArg, argArray) => {
        const result = target.apply(thisArg, argArray as any);
        this.current = window.location.pathname;
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

  public isMatchFull(path: string) {
    return this.current.trim("/") === path.trim("/");
  }

  public isMatchPartial(path: string) {
    return this.current.trim("/").startsWith(path.trim("/"));
  }
}

export const Nav = new NavImpl();
