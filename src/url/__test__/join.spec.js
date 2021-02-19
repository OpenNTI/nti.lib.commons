/* eslint-env jest */
import join from '../join';

describe('join', () => {
	test('Simple Case', () => {
		expect(join('/test/', '/resources/images/favicon.ico')).toBe(
			'/test/resources/images/favicon.ico'
		);

		expect(
			join('http://foo.bar:123/test/', '/resources/images/favicon.ico')
		).toBe('http://foo.bar:123/test/resources/images/favicon.ico');
	});

	test('Preserve Query', () => {
		expect(join('/test/?foo=test', '/resources/images/favicon.ico')).toBe(
			'/test/resources/images/favicon.ico?foo=test'
		);
	});

	test('Append Query', () => {
		expect(
			join('/test/?foo=test', '/resources/?item=2', '/images/favicon.ico')
		).toBe('/test/resources/images/favicon.ico?foo=test&item=2');
	});

	test('Update Query', () => {
		expect(
			join('/test/?foo=test', '/resources/images/favicon.ico?foo=bar')
		).toBe('/test/resources/images/favicon.ico?foo=bar');
	});

	test('Preserve Hash', () => {
		expect(join('/test/#test', '/resources/images/favicon.ico')).toBe(
			'/test/resources/images/favicon.ico#test'
		);
	});

	test('Replace Hash', () => {
		expect(join('/test/#test', '/resources/images/favicon.ico#w00t')).toBe(
			'/test/resources/images/favicon.ico#w00t'
		);
	});

	test('Append Query, Preserve Hash', () => {
		expect(
			join('/test/?foo=test#lala', '/resources/images/favicon.ico?item=2')
		).toBe('/test/resources/images/favicon.ico?foo=test&item=2#lala');
	});
});
