/* eslint-env jest */

describe('URL.parse', () => {

	test('calls url.parse()', () => {
		const mockUrl = {parse: jest.fn()};
		jest.doMock('url', () => mockUrl);

		const parse = require('../parse').default;

		expect(mockUrl.parse).not.toHaveBeenCalled();

		parse();

		expect(mockUrl.parse).toHaveBeenCalled();
	});
});
