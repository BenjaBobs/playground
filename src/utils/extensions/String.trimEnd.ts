declare global {
  interface String {
    trimEnd(substring: string | string[]): string;
  }
}

Object.defineProperty(String.prototype, "trimEnd", {
  value: function (this: string, input: string | string[]) {
    input ??= " ";

    return typeof input === "string"
      ? this.replace(new RegExp(`${input}+$`), "")
      : this.replace(new RegExp(`[${input}]+$`), "");
  },
});

export {};
