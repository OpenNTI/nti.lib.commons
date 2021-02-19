/* eslint-env jest */
describe('URL.resolve', () => {
	test('calls url.parse().resolve()', () => {
		const mockUrlImpl = { resolve: jest.fn() };
		const mockUrl = { parse: jest.fn(() => mockUrlImpl) };

		jest.doMock('url', () => mockUrl);

		const resolve = require('../resolve').default;

		expect(mockUrlImpl.resolve).not.toHaveBeenCalled();
		expect(mockUrl.parse).not.toHaveBeenCalled();

		resolve();

		expect(mockUrlImpl.resolve).toHaveBeenCalled();
		expect(mockUrl.parse).toHaveBeenCalled();
	});
});
