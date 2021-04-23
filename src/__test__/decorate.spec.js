/* eslint-env jest */
import { decorate } from '../decorate.js';

describe('decorate', () => {
	test('Basic assumptions', () => {
		expect(decorate).toThrow(/Invalid arguments/);
		expect(() => decorate(Object)).toThrow(/Invalid arguments/);
		expect(() => decorate(Object, [])).toThrow(/Invalid arguments/);
		expect(() => decorate(Object, [true])).toThrow(/Invalid arguments/);
		expect(() => decorate(Object, [false])).toThrow(/Invalid arguments/);
		expect(() => decorate(Object, [1])).toThrow(/Invalid arguments/);
		expect(() => decorate(Object, [{}])).toThrow(/Invalid arguments/);

		expect(() => decorate(Object, [(a, b) => {}])).toThrow(
			/Invalid decorator/
		);
		expect(() => decorate(Object, [a => {}])).not.toThrow();
		expect(() => decorate(Object, [() => {}])).not.toThrow();

		const a = 1;
		const add4 = x => x + 4;
		const noop = () => {};

		expect(decorate(a, [noop])).toBe(a);
		expect(decorate(a, [noop, add4])).toBe(5);
		expect(decorate(a, [add4, noop])).toBe(5);
		expect(decorate(a, [noop, add4, noop])).toBe(5);
		expect(decorate(a, [add4])).toBe(5);

		const Fun = x => {
			x.fun = true;
		};

		class Foo {}
		expect(Foo).not.toHaveProperty('fun');

		decorate(Foo, [Fun]);
		expect(Foo).toHaveProperty('fun');
	});
});
