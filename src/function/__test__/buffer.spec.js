/* eslint-env jest */
import { buffer } from '../buffer.js';

describe('buffer', () => {
	test('basics', () => {
		jest.useFakeTimers();
		const fn = jest.fn();

		expect(() => buffer()).toThrow(
			'Illegal Argument: The first argument must be a number'
		);
		expect(() => buffer(1)).toThrow(
			'Illegal Argument: The second argument must be a function'
		);

		const b = buffer(1, fn);

		b();
		b();

		expect(fn).not.toHaveBeenCalled();

		expect(b.pending).toBe(true);

		jest.runAllTimers();

		expect(b.pending).toBe(false);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test('flush', () => {
		jest.useFakeTimers();
		const fn = jest.fn();

		const b = buffer(1, fn);

		b();

		expect(fn).not.toHaveBeenCalled();
		expect(b.pending).toBe(true);

		b.flush();
		b.flush();

		expect(b.pending).toBe(false);
		expect(fn).toHaveBeenCalledTimes(1);

		jest.runAllTimers();

		expect(b.pending).toBe(false);
		expect(fn).toHaveBeenCalledTimes(1);
	});
});
