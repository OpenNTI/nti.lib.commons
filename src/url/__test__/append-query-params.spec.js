/* eslint-env jest */
import appendQueryParams from '../append-query-params';

describe('appendQueryParams', () => {

	test('Throws on invalid arguments', () => {
		expect(() => appendQueryParams()).toThrow(/Parameter "url" must be a string/);
	});


	test('Preserves input', () => {
		expect(appendQueryParams('')).toBe('');
		expect(appendQueryParams('/')).toBe('/');
		expect(appendQueryParams('/test')).toBe('/test');
		expect(appendQueryParams('/test?foo=bar')).toBe('/test?foo=bar');
		expect(appendQueryParams('/test#lala')).toBe('/test#lala');
		expect(appendQueryParams('/test?foo=bar#lala')).toBe('/test?foo=bar#lala');
	});

	test('Adds/Updates url query-params', () => {
		const params = {
			test: 'foobar',
			awesome: [
				1,2,3
			]
		};

		expect(appendQueryParams('', params)).toBe('?awesome=1&awesome=2&awesome=3&test=foobar');
		expect(appendQueryParams('/', params)).toBe('/?awesome=1&awesome=2&awesome=3&test=foobar');
		expect(appendQueryParams('/test', params)).toBe('/test?awesome=1&awesome=2&awesome=3&test=foobar');
		expect(appendQueryParams('/test?foo=bar', {...params, foo: 'baz'})).toBe('/test?awesome=1&awesome=2&awesome=3&foo=baz&test=foobar');
		expect(appendQueryParams('/test#lala', params)).toBe('/test?awesome=1&awesome=2&awesome=3&test=foobar#lala');
		expect(appendQueryParams('/test?foo=bar#lala', params)).toBe('/test?awesome=1&awesome=2&awesome=3&foo=bar&test=foobar#lala');
	});
});
