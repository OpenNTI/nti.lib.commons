/* eslint-env jest */
import defineProtected from '../define-protected';

describe('Object property spec macros:', () => {
	test('defineProtected (non-enumerable/skipped by JSON.stringify)', () => {
		expect(defineProtected({ test: 'abc', foo: 'bar' })).toEqual({
			test: {
				configurable: true,
				enumerable: false,
				writable: false,
				value: 'abc',
			},
			foo: {
				configurable: true,
				enumerable: false,
				writable: false,
				value: 'bar',
			},
		});
	});
});
