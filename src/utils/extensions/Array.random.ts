declare global {
	interface Array<T> {
		/**
		 * Returns a random element of the array or undefined if empty.
		 * @returns The a random element of the array, or undefined if the array is empty.
		 */
		random(): T | undefined;
	}
}

Object.defineProperty(Array.prototype, "random", {
	value: function <T1>(this: Array<T1>) {
		if (!this.length) return undefined;

		const idx = Math.floor(Math.random() * this.length);

		return this[idx];
	},
});

export {};
