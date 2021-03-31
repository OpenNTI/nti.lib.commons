/* eslint-env jest */
import { definePublic } from '../define-public.js';

describe('Object property spec macros:', () => {
	test('definePublic (readOnly, but enumerable)', () => {
		expect(definePublic({ test: 'abc', foo: 'bar' })).toEqual({
			test: {
				configurable: true,
				enumerable: true,
				writable: false,
				value: 'abc',
			},
			foo: {
				configurable: true,
				enumerable: true,
				writable: false,
				value: 'bar',
			},
		});
	});
});
