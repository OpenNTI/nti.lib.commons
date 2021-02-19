/* eslint-env jest */
import insert from '../insert';

describe('insert-item', () => {
	test('should insert the element at the specified index', () => {
		let a = [1, 2, 3];
		expect(insert(a, 0, 0)).toEqual([0, 1, 2, 3]);
		expect(insert(a, 'x', 2)).toEqual([1, 2, 'x', 3]);
	});

	test('should not alter the input array', () => {
		let a = [1, 2, 3];
		insert(a, 0, 0);
		expect(a).toEqual([1, 2, 3]);
	});
});
