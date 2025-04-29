declare global {
	interface Array<T> {
		/**
		 * Returns the minimum value by > comparison.
		 */
		max(): T | undefined;
	}
}

Object.defineProperty(Array.prototype, "max", {
	value: function <T1>(this: Array<T1>) {
		if (!this.length) return undefined;

		return this.reduce(
			(result, next) => (next > result ? next : result),
			this[0],
		);
	},
});

export {};
