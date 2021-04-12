/* eslint-env jest */
import { chain } from '../chain.js';

async function* makeAsyncIterable (values) {
	for (let value of values) {
		const resolved = await value;

		yield resolved;
	}
}

async function makeAsyncValue (value) {
	return value;
}

async function resolveAsyncIterable (iter) {
	const resolved = [];

	for await (let value of iter) {
		resolved.push(value);
	}

	return resolved;
}

test('Iterable chain', () => {
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

	expect(await t(makeAsyncValue(1))).toEqual([1]);
	expect(await t(makeAsyncIterable([1, 2, 3]))).toEqual([1, 2, 3]);
	expect(await t(makeAsyncIterable([1, 2, 3]), 4, makeAsyncValue(5))).toEqual([1, 2, 3, 4, 5]);
});
