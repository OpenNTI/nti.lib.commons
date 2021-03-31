/* eslint-env jest */
import { move } from '../move.js';

describe('move-item', () => {
	test('should move the element upward in the array', () => {
		let a = ['a', 'b', 'c'];
		expect(move(a, 2, 0)).toEqual(['c', 'a', 'b']);
	});

	test('should move the element downward in the array', () => {
		let a = ['a', 'b', 'c'];
		expect(move(a, 0, 2)).toEqual(['b', 'c', 'a']);
	});

	test('should not alter the input array', () => {
		let a = [1, 2, 3];
		move(a, 0, 2);
		expect(a).toEqual([1, 2, 3]);
	});
});
