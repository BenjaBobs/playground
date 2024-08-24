declare global {
  interface Array<T> {
    /**
     * Returns the first element of the array.
     * @returns The first element of the array, or undefined if the array is empty.
     */
    first(): T | undefined;
  }
}

Object.defineProperty(Array.prototype, "first", {
  value: function <T1>(this: Array<T1>) {
    return this[0];
  },
});

export {};
