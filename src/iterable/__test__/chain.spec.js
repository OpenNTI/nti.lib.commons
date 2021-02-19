/* eslint-env jest */
import { chain } from '../chain';

test('Iterable chain', () => {
	expect([...chain([[1], 2, [3, 4], [5, 6]])]).toEqual([1, 2, 3, 4, 5, 6]);
	expect([...chain([1])]).toEqual([1]);
	expect([...chain(1)]).toEqual([1]);
});
