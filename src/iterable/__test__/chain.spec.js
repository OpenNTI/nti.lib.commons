/* eslint-env jest */
import { chain } from '../chain.js';
import { wait } from '../../wait/wait';

async function* makeAsyncIterable(values) {
	for (let value of values) {
		await wait(1);

		yield value;
	}
}

async function makeAsyncValue(value) {
	await wait(1);
	return value;
}

async function resolveAsyncIterable(iter) {
	const resolved = [];

	for await (let value of iter) {
		resolved.push(value);
	}

	return resolved;
}

const syncIterable = {
	[Symbol.iterator]() {
		let i = 0;
		return {
			// This is a basic iterator that simply counts up to 2 from 0.
			next() {
				if (i < 3) {
					return { value: i++, done: false };
				}

				return { done: true };
			},
		};
	},
};

const asyncIterable = {
	[Symbol.asyncIterator]() {
		// The main difference between an asynchronous iterator and a
		// synchronous iterator is the `next()` method is async. (returns a
		// promise)
		const itr = syncIterable[Symbol.iterator]();
		return {
			async next() {
				// async functions auto-wrap return values into promises.
				return itr.next();
			},
		};
	},
};

test('Iterable chain', () => {
	expect([...chain(syncIterable)]).toEqual([0, 1, 2]);
	expect([...chain(syncIterable, syncIterable)]).toEqual([0, 1, 2, 0, 1, 2]);
	expect([...chain([1], 2, [3, 4], [5, 6])]).toEqual([1, 2, 3, 4, 5, 6]);
	expect([...chain([1])]).toEqual([1]);
	expect([...chain(1)]).toEqual([1]);
});

test('Async Iterable chain', async () => {
	const t = async (...v) => {
		const iter = chain.async(...v);
		const r = await resolveAsyncIterable(iter);

		return [...r];
	};

	expect(await t(asyncIterable)).toEqual([0, 1, 2]);
	expect(await t(asyncIterable, asyncIterable)).toEqual([0, 1, 2, 0, 1, 2]);

	expect(await t(makeAsyncValue(1))).toEqual([1]);
	expect(await t(makeAsyncIterable([1, 2, 3]))).toEqual([1, 2, 3]);
	expect(
		await t(makeAsyncIterable([1, 2, 3]), 4, makeAsyncValue(5))
	).toEqual([1, 2, 3, 4, 5]);
});
