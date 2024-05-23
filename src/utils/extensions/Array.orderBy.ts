declare global {
  interface Array<T> {
    /**
     * Returns a new array, ordered by the value selected by the provided selector function.
     * The order can be either ascending (default) or descending.
     *
     * @param selector A function that takes an item of type T and returns a value of type T2 by which to order.
     * @param dir The direction of the sort. Can be either "asc" for ascending (default) or "desc" for descending.
     * @returns A new array sorted by the selected value.
     *
     * @example
     * const arr = [{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Joe', age: 35}];
     * const orderedByName = arr.orderBy(item => item.name);
     * console.log(orderedByName); // [{name: 'Jane', age: 25}, {name: 'Joe', age: 35}, {name: 'John', age: 30}]
     *
     * const orderedByAgeDesc = arr.orderBy(item => item.age, 'desc');
     * console.log(orderedByAgeDesc); // [{name: 'Joe', age: 35}, {name: 'John', age: 30}, {name: 'Jane', age: 25}]
     */
    orderBy<T2>(selector: (item: T) => T2, dir?: "asc" | "desc"): Array<T>;
  }
}

Object.defineProperty(Array.prototype, "orderBy", {
  value: function <T1, T2>(
    this: Array<T1>,
    selector: (item: T1) => T2,
    dir?: "asc" | "desc"
  ) {
    if (!this.length) return [];

    const ordered = [...this];

    if (!dir || dir === "asc")
      ordered.sort((a, b) => -selector(b) - -selector(a));
    else ordered.sort((a, b) => -selector(a) - -selector(b));

    return ordered;
  },
});

export {};
