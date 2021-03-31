/* eslint-env jest */
describe('URL.resolve', () => {
	test('calls url.parse().resolve()', () => {
		const { resolve } = require('../resolve');

		expect(resolve('/a/bc', './b')).toEqual('/a/b');
		expect(resolve('/a/bc', '/b')).toEqual('/b');
	});
});
