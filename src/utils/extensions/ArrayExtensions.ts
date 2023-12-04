declare global {
  interface Array<T> {
    /**
     * Returns a new array, ordered ascendingly by the selected value.
     * @param selector A function to select the value by which to order.
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
