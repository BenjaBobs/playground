declare global {
  interface String {
    trim(substring: string): string;
    trimStart(substring: string | string[]): string;
    trimEnd(substring: string | string[]): string;
  }
}

Object.defineProperty(String.prototype, "trimStart", {
  value: function (this: string, input: string | string[]) {
    input ??= " ";

    return typeof input === "string"
      ? this.replace(new RegExp(`^${input}+`), "")
      : this.replace(new RegExp(`^[${input}]+`), "");
  },
});

Object.defineProperty(String.prototype, "trimEnd", {
  value: function (this: string, input: string | string[]) {
    input ??= " ";

    return typeof input === "string"
      ? this.replace(new RegExp(`${input}+$`), "")
      : this.replace(new RegExp(`[${input}]+$`), "");
  },
});

Object.defineProperty(String.prototype, "trim", {
  value: function (this: string, input: string | string[]) {
    return this.trimStart(input).trimEnd(input);
  },
});

export {};
