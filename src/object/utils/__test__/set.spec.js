/* eslint-env jest */
import { set } from '../set.js';

describe('object set util', () => {
	test('throws if no args', () => {
		expect(() => set()).toThrow(
			'Object Set: Cannot call with a non object root'
		);
	});

	test('throws if non object root', () => {
		expect(() => set('a', 'path')).toThrow(
			'Object Set: Cannot call with a non object root'
		);
	});

	test('sets value on already existing path', () => {
		const value = 'value';
		const obj = { foo: { bar: {} } };

		set(obj, 'foo.bar.value', value);

		expect(obj.foo.bar.value).toBe(value);
	});

	test('creates missing parts of the path', () => {
		const value = 'value';
		const obj = {};

		set(obj, 'foo.bar.value', value);

		expect(obj.foo.bar.value).toBe(value);
	});
});
