declare global {
  interface Array<T> {
    /**
     * Groups the elements of the array based on the provided selector function.
     * @param selector A function that defines the grouping criteria for each element.
     * @returns An array of ArrayGroup objects, each representing a group of elements with the same key.
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const groups = numbers.groupBy((num) => num % 2 === 0 ? 'even' : 'odd');
     * console.log(groups);
     * // Output: [ArrayGroup { key: 'odd', [1, 3, 5] }, ArrayGroup { key: 'even', [2, 4] }]
     */
    groupBy<T2>(selector: (item: T) => T2): ArrayGroup<T, T2>[];
  }
}

class ArrayGroup<TItem, TKey> extends Array<TItem> {
  constructor(public key: TKey) {
    super();
  }
}

Object.defineProperty(Array.prototype, "groupBy", {
  value: function <TItem, TKey>(
    this: TItem[],
    selector: (item: TItem) => TKey
  ) {
    const groups = new Map<TKey, ArrayGroup<TItem, TKey>>();

    this.forEach((item) => {
      const key = selector(item);
      const group = groups.get(key) ?? new ArrayGroup(key);
      group.push(item);
      groups.set(key, group);
    });

    return [...groups.values()];
  },
});

export {};
