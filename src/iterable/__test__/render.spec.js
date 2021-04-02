/* eslint-env jest */
import { render } from '../render';

test('Iterable render', () => {
	expect([...render([1], x => x * 10)]).toEqual([10]);
});
