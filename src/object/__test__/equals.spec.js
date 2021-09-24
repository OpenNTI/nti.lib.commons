/* eslint-env jest */
import { equals } from '../equals';

const falsy = [null, void 0, 0, false, ''];
const truthy = [{}, 'a', 1, true];

test('equals', () => {
	expect(falsy.every(x => equals(x, x))).toBe(true);
	expect(falsy.every(x => truthy.every(y => equals(x, y)))).toBe(false);
});

test('equals deep', () => {
	const a = {
		a: 'b',
		c: [1, 2, 3],
	};

	const b = {
		a: 'b',
		c: [1, 2, 3],
	};

	const c = {};

	expect(equals(a, b, true)).toBe(true);
	expect(equals(a, c, true)).toBe(false);
});

test('equals deep, cycles', () => {
	const makeCycle = () => {
		const c1 = {};
		const c2 = { c1 };
		c1.c2 = c2;
		return c1;
	};

	const a = {
		c2: makeCycle(),
	};

	const b = {
		c2: makeCycle(),
	};

	const c = {
		c3: makeCycle(),
	};

	expect(equals(a, b, true)).toBe(true);
	expect(equals(a, c, true)).toBe(false);
});
