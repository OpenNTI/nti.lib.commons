/* eslint-disable no-console */
/* eslint-env jest */
import { getRefHandler } from '../get-ref-handler.js';

test('getRefHandler', () => {
	const parentRef = jest.fn();
	const localRef = jest.fn();
	jest.spyOn(console, 'error').mockImplementation(() => {});

	expect(() => getRefHandler()).not.toThrow();
	expect(() => getRefHandler(parentRef)).toThrow();
	expect(getRefHandler()).toEqual(void 0);

	expect(getRefHandler({}, localRef)).toBe(localRef);
	expect(console.error.mock.calls).toMatchSnapshot();

	const A = getRefHandler(parentRef, localRef);
	const B = getRefHandler(parentRef, localRef);
	const C = getRefHandler(jest.fn(), localRef);
	const D = getRefHandler(parentRef, jest.fn());

	expect(A).toBe(B);

	expect(C).not.toBe(A);
	expect(D).not.toBe(B);
	expect(D).not.toBe(C);
});
