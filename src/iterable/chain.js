async function* asyncChain (...generators) {
	for (let generator of generators) {
		if (!generator || !(generator[Symbol.asyncIterator] ?? generator[Symbol.iterator])) {
			yield await generator;
			continue;
		}

		for await (let value of generator) {
			yield value;
		}
	}
}

chain.async = asyncChain;
/**
 * This is primarily used to combine several iterators together. Lazy iterators welcome.
 *
 * @param {...*} generators any input. If iterable, will iterate it. If the element of the iterable is iterable it will recurse and iterate that.
 * @returns {Iterator}
 */
export function* chain (...generators) {
	for (let generator of generators) {
		if (!generator || !generator[Symbol.iterator]) {
			yield generator;
			continue;
		}

		for (let value of generator) {
			yield value;
		}
	}
}
