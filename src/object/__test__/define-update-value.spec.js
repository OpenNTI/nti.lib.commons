/* eslint-env jest */
import updateValue from '../define-update-value';

describe('Object property spec macros:', () => {
	test('updateValue', () => {
		const o = { test: 'abc' };
		const spec = { ...Object.getOwnPropertyDescriptor(o, 'test') };
		expect(o.test).toBe('abc');

		updateValue(o, 'test', 'xyz');

		expect(o.test).toBe('xyz');
		expect(Object.getOwnPropertyDescriptor(o, 'test')).toEqual({
			...spec,
			value: 'xyz',
		});

		//Updating a non-existant property creates it 'readOnly and non-enumerable'
		expect(o.foo).toBeUndefined();
		updateValue(o, 'foo', 'bar');
		expect(o.foo).toBe('bar');
		expect(Object.getOwnPropertyDescriptor(o, 'foo').writable).toBe(false);
		expect(Object.getOwnPropertyDescriptor(o, 'foo').enumerable).toBe(
			false
		);
	});
});
