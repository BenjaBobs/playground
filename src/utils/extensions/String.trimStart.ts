declare global {
  /**
   * Represents the extension to the built-in `String` interface.
   */
  interface String {
    trimStart(substring: string | string[]): string;
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

export {};
