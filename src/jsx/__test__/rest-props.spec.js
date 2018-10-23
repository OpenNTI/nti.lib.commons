/* eslint-env jest */
import {restProps} from '../rest-props';

test ('restProps', () => {
	const [a,b,c,d,e,f,g] = [];
	const MockComponent = { propTypes: { a,b,c } };

	expect(restProps).not.toThrow();
	expect(restProps(MockComponent, {a,b,c,d,e,f,g})).toEqual({d,e,f,g});

});
