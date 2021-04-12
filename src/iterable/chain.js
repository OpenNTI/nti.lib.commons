/**
 * This is primarily used to combine several asynchronous iterators together. Lazy iterators welcome.
 *
 * Given varArgs of items iterate and:
 * 1.) if the item is not iterable, yield that value
 * 2.) if the item is iterable, yield* that item's iterator before continuing to the next item
 *
 * @param {...*} items a list of items to chain
 * @returns {Iterator}
 */
async function* asyncChain (...items) {
	for (let item of items) {
		if (!item || !(item[Symbol.asyncIterator] ?? item[Symbol.iterator])) {
			yield await item;
			continue;
		}

		yield* item;
	}
}

chain.async = asyncChain;
/**
 * This is primarily used to combine several iterators together. Lazy iterators welcome.
 *
 * Given varArgs of items iterate and:
 * 1.) if the item is not iterable, yield that value
 * 2.) if the item is iterable, yield* that item's iterator before continuing to the next item
 *
 * @param {...*} items a list of items to chain
 * @returns {Iterator}
 */
export function* chain (...items) {
	for (let item of items) {
		if (!item || !item[Symbol.iterator]) {
			yield item;
			continue;
		}

		yield* item;
	}
}
