import definePublic from '../object-define-public';

describe ('Object property spec macros:', () => {
	it ('definePublic (readOnly, but enumerable)', () => {
		expect(definePublic({test: 'abc', foo: 'bar'}))
			.toEqual({
				test: {configurable: true, enumerable: true, writable: false, value: 'abc'},
				foo: {configurable: true, enumerable: true, writable: false, value: 'bar'}
			});
	});
});
