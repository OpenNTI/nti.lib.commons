/* eslint-env jest */
import { defineReadOnly } from '../define-readonly.js';

describe('Object property spec macros:', () => {
	test('readOnly', () => {
		expect(defineReadOnly('abc')).toEqual({
			configurable: true,
			enumerable: false,
			writable: false,
			value: 'abc',
		});
		expect(defineReadOnly('abc', true)).toEqual({
			configurable: true,
			enumerable: true,
			writable: false,
			value: 'abc',
		});

		function test(visible) {
			const o = {};
			expect(o.test).toBeUndefined();
			Object.defineProperty(o, 'test', defineReadOnly('abc', visible));
			expect(o.test).not.toBeUndefined();
			expect(o.test).toBe('abc');
			expect(() => (o.test = 'xyz')).toThrow();
			expect(o.test).toBe('abc');
			expect(Object.keys(o).includes('test')).toBe(visible);
			expect(JSON.stringify(o)).toBe(visible ? '{"test":"abc"}' : '{}');
		}

		test(false);
		test(true);
	});
});
