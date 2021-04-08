/* eslint-env jest */

describe('URL.parse', () => {
	test('new URL', () => {
		const { parse } = require('../parse');

		const get = ({
			hash,
			host,
			hostname,
			href,
			origin,
			password,
			pathname,
			port,
			protocol,
			search,
			username,
		}) => ({
			hash,
			host,
			hostname,
			href,
			origin,
			password,
			pathname,
			port,
			protocol,
			search,
			username,
		});

		expect(get(parse('/foo'))).toMatchInlineSnapshot(`
		Object {
		  "hash": "",
		  "host": "",
		  "hostname": "",
		  "href": "file:///foo",
		  "origin": "null",
		  "password": "",
		  "pathname": "/foo",
		  "port": "",
		  "protocol": "file:",
		  "search": "",
		  "username": "",
		}
	`);
		expect(get(parse('http://foo/bar?q=1'))).toMatchInlineSnapshot(`
		Object {
		  "hash": "",
		  "host": "foo",
		  "hostname": "foo",
		  "href": "http://foo/bar?q=1",
		  "origin": "http://foo",
		  "password": "",
		  "pathname": "/bar",
		  "port": "",
		  "protocol": "http:",
		  "search": "?q=1",
		  "username": "",
		}
	`);
	});
});
