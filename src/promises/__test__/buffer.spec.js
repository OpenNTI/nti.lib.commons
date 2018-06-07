/* eslint-env jest */
/* eslint no-unused-vars: 0 */
/* globals spyOn */

import buffer from '../buffer';

describe('Promises: buffer', () => {
	jest.useFakeTimers();

	test ('resolves promise returned by factory', async () => {
		const factory = jest.fn(() => Promise.resolve('foo'));
		const p = buffer(300, factory);

		expect(factory).not.toBeCalled();

		jest.runAllTimers();

		expect(factory).toBeCalled();
		expect(factory).toHaveBeenCalledTimes(1);

		return expect(p).resolves.toBe('foo');
	});

	test ('rejects when aborted before delay', async () => {
		const factory = jest.fn(() => Promise.resolve('foo'));
		const p = buffer(300, factory);

		expect(factory).not.toBeCalled();

		expect(() => p.abort()).not.toThrow();

		jest.runAllTimers();

		expect(factory).not.toBeCalled();

		return expect(p).rejects.toBe('aborted');
	});

	// QUESTION: Should we just wrap the promise and make it reject 'aborted' and drop the factory's promise?
	// Then make this just a warning?
	test ('throws when aborted after delay and the promise returned by factory does not have an abort method', async () => {
		const factory = jest.fn(() => Promise.resolve('foo'));
		const p = buffer(300, factory);

		expect(factory).not.toBeCalled();

		jest.runAllTimers();

		expect(factory).toBeCalled();

		expect(() => p.abort()).toThrow();

	});

	test ('calls abort on the returned promise of factory if it exists', async () => {
		const abort = jest.fn();
		// This factory returns a simulated promise that has been augmented with an abort method.
		// Its resolution is irrelevant, since once our buffer has elapsed, we cannot guarantee
		// the promise will abort.
		const factory = jest.fn(() => ({abort}));

		const p = buffer(300, factory);

		expect(abort).not.toBeCalled();
		expect(factory).not.toBeCalled();

		jest.runAllTimers();

		expect(factory).toHaveBeenCalledTimes(1);

		expect(() => p.abort()).not.toThrow();
		expect(abort).toBeCalled();
	});
});
