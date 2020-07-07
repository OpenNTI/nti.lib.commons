/* eslint-env jest */
import { decorate } from '../decorate';

describe('decorate', () => {

	test ('Basic assumptions', () => {

		expect(decorate).toThrow(/Invalid arguments/);
		expect(() => decorate({target: Object})).toThrow(/Invalid arguments/);
		expect(() => decorate({target: Object, with: []})).toThrow(/Invalid arguments/);
		expect(() => decorate({target: Object, with: [true]})).toThrow(/Invalid arguments/);
		expect(() => decorate({target: Object, with: [false]})).toThrow(/Invalid arguments/);
		expect(() => decorate({target: Object, with: [1]})).toThrow(/Invalid arguments/);
		expect(() => decorate({target: Object, with: [{}]})).toThrow(/Invalid arguments/);

		expect(() => decorate({target: Object, with: [(a,b) => {}]})).toThrow(/Invalid decorator/);
		expect(() => decorate({target: Object, with: [(a) => {}]})).not.toThrow();
		expect(() => decorate({target: Object, with: [() => {}]})).not.toThrow();

		const a = 1;
		const add4 = x => x + 4;
		const noop = () => {};

		expect(decorate({target: a, with: [noop]})).toBe(a);
		expect(decorate({target: a, with: [noop, add4]})).toBe(5);
		expect(decorate({target: a, with: [add4, noop]})).toBe(5);
		expect(decorate({target: a, with: [noop, add4, noop]})).toBe(5);
		expect(decorate({target: a, with: [add4]})).toBe(5);

		const Fun = x => {
			x.fun = true;
		};

		class Foo {}
		expect(Foo).not.toHaveProperty('fun');

		decorate({target: Foo, with: [Fun]});
		expect(Foo).toHaveProperty('fun');
	});


});
