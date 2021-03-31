/* eslint-env jest */
import { between } from '../between.js';

describe('between', () => {
	test('should not throw errors with odd input', () => {
		expect(between(0)).toBe(false);
		expect(between('0')).toBe(false);
		expect(between(false)).toBe(false);
		expect(between(true)).toBe(false);
		expect(between({})).toBe(false);
		expect(between([])).toBe(false);

		expect(between(1, 0, 'auisdkjh')).toBe(false);
	});

	test('should correctly work with numbers', () => {
		expect(between(0, -1, 1)).toBe(true);
		expect(between(0, -1, 1)).toBe(true);
		expect(between.inclusive(0, -1, 1)).toBe(true);
		//order independent
		expect(between(0, 1, -1)).toBe(true);
		expect(between(0, 1, -1)).toBe(true);
		expect(between.inclusive(0, 1, -1)).toBe(true);

		expect(between(2, 1, -1)).toBe(false);

		expect(between.inclusive(1, 1, -1)).toBe(true);
		expect(between(1, 1, -1)).toBe(false);
		expect(between(1, 1, -1)).toBe(false);

		expect(between(1, 0.1, 0.6)).toBe(false);
		expect(between(0.5, 0.1, 0.6)).toBe(true);
	});
});
