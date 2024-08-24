declare global {
  interface Array<T> {
    /**
     * Returns the last element of the array.
     * @returns The last element of the array, or undefined if the array is empty.
     */
    last(): T | undefined;
  }
}

Object.defineProperty(Array.prototype, "last", {
  value: function <T>(this: Array<T>) {
    return this[this.length - 1];
  },
});

export {};
