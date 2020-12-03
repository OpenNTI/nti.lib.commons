/* eslint-env jest */
import {autobind} from '../autobind';

describe ('autobind', () => {

	test ('should replace the keys with bound functions', () => {
		const func = function () { return this; };
		const o = { func };

		autobind(o, 'func');

		const boundFunc = o.func;

		expect(o.func).not.toBe(func);
		expect(typeof o.func).toEqual('function');
		expect(o.func()).toBe(o);
		expect(boundFunc()).toBe(o);
		expect(func()).not.toBe(o);
	});

});
