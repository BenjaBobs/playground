declare global {
  interface Array<T> {
    /**
     * Returns a new array that contains all the elements of the original array except the specified items.
     * @param items The items to exclude from the array.
     * @returns A new array that contains all the elements of the original array except the specified items.
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const result = numbers.except(2, 4);
     * console.log(result); // Output: [1, 3, 5]
     */
    except(...items: T[]): T[];
  }
}

Object.defineProperty(Array.prototype, "except", {
  value: function <T>(this: T[], ...items: T[]) {
    return this.filter((item) => !items.includes(item));
  },
});

export {};
