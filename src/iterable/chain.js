/**
 * This is primarily used to combine several iterators together. Lazy iterators welcome.
 *
 * @param {*} input any input. If iterable, will iterate it. If the element of the iterable is iterable it will recurse and iterate that.
 * @returns {Iterator}
 */
export function* chain(input) {
	if (!input || !input[Symbol.iterator]) {
		yield input;
		return;
	}

	const it = input[Symbol.iterator]();
	let current;
	do {
		current = it.next();
		if (current.done) {
			continue;
		}

		yield* chain(current.value);
	} while (!current.done);
}
