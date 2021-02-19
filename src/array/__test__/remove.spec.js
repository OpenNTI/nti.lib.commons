/* eslint-env jest */
import remove from '../remove';

describe('remove-item', () => {
	test('should remove the element at the specified index', () => {
		let a = [1, 2, 3];
		expect(remove(a, 0)).toEqual([2, 3]);
	});

	test('should not modify the input array', () => {
		let a = [1, 2, 3];
		remove(a, 0);
		expect(a).toEqual([1, 2, 3]);
	});
});
