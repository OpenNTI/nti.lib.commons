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

const asyncIterable = {
	[Symbol.asyncIterator]() {
		return {
			i: 0,
			next() {
				if (this.i < 3) {
					return Promise.resolve({ value: this.i++, done: false });
				}

				return Promise.resolve({ done: true });
			},
		};
	},
};

const syncIterable = {
	[Symbol.iterator]() {
		return {
			i: 0,
			next() {
				if (this.i < 3) {
					return { value: this.i++, done: false };
				}

				return { done: true };
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
