declare global {
  interface String {
    trim(substring: string): string;
  }
}

Object.defineProperty(String.prototype, "trim", {
  value: function (this: string, input: string | string[]) {
    return this.trimStart(input).trimEnd(input);
  },
});

export {};
