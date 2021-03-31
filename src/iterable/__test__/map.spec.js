/* eslint-env jest */
import { map } from '../map.js';

test('Iterable render', () => {
	expect([...map([1], x => x * 10)]).toEqual([10]);
});
