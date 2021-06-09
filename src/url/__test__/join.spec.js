/* eslint-env jest */
import { join } from '../join.js';

describe('join', () => {
	test('Simple Case', () => {
		//server relative parts (absolute paths)
		expect(join('/test/', '/resources/images/favicon.ico')).toBe(
			'/test/resources/images/favicon.ico'
		);

		// absolute base, server relative parts (absolute paths)
		expect(
			join('http://foo.bar:123/test/', '/resources/images/favicon.ico')
		).toBe('http://foo.bar:123/test/resources/images/favicon.ico');

		// Relative parts
		expect(join('/dataserver2/ResolveUser', 'content.editor.alpha')).toBe(
			'/dataserver2/ResolveUser/content.editor.alpha'
		);
	});

	//XXX: This doesn't make logical sense. Only the query/search on the last input with a path segment should carry forward
	test('Preserve Query', () => {
		expect(join('/test/?foo=test', '/resources/images/favicon.ico')).toBe(
			'/test/resources/images/favicon.ico?foo=test'
		);
	});

	//XXX: This doesn't make logical sense. Only the query/search on the last input with a path segment should carry forward
	test('Append Query', () => {
		expect(
			join('/test/?foo=test', '/resources/?item=2', '/images/favicon.ico')
		).toBe('/test/resources/images/favicon.ico?foo=test&item=2');
	});

	//XXX: This doesn't make logical sense. Only the query/search on the last input with a path segment should carry forward.
	test('Update Query', () => {
		expect(
			join('/test/?foo=test', '/resources/images/favicon.ico?foo=bar')
		).toBe('/test/resources/images/favicon.ico?foo=bar');
	});

	//XXX: This doesn't make logical sense. Only the query/search on the last input with a path segment should carry forward (or matching paths)
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

	//XXX: This doesn't make logical sense. Only the query/search on the last input with a path segment should carry forward (or matching paths)
	test('Append Query, Preserve Hash', () => {
		expect(
			join('/test/?foo=test#lala', '/resources/images/favicon.ico?item=2')
		).toBe('/test/resources/images/favicon.ico?foo=test&item=2#lala');
	});
});
