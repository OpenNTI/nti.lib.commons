/* eslint-env jest */
import { getPropertyDescriptor } from '../get-property-descriptor.js';

describe('getPropertyDescriptor', () => {
	const obj = { test: 1234 };
	test('finds own property', () => {
		expect(getPropertyDescriptor(obj, 'test')).toBeTruthy();
	});

	test('finds parent property', () => {
		const o = Object.create({ test: 'foo' });
		expect(Object.getOwnPropertyDescriptor(o, 'test')).toBeFalsy();
		expect(getPropertyDescriptor(o, 'test')).toBeTruthy();
	});

	test('handles missing property', () => {
		const o = Object.create({ test: 'foo' });
		expect(() => getPropertyDescriptor(o, 'missing')).not.toThrow();
		expect(getPropertyDescriptor(o, 'missing')).toBeFalsy();
	});

	test('returns null for bad args', () => {
		expect(getPropertyDescriptor()).toBe(null);
		expect(getPropertyDescriptor(null)).toBe(null);
		expect(getPropertyDescriptor(undefined)).toBe(null);
	});
});
