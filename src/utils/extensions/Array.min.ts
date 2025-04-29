declare global {
	interface Array<T> {
		/**
		 * Returns the minimum value by < comparison.
		 */
		min(): T | undefined;
	}
}

Object.defineProperty(Array.prototype, "min", {
	value: function <T1>(this: Array<T1>) {
		if (!this.length) return undefined;

		return this.reduce(
			(result, next) => (next < result ? next : result),
			this[0],
		);
	},
});

export {};
