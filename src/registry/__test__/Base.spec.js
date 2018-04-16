/* eslint-env jest */
import BaseRegistry from '../Base';

class TestRegistry extends BaseRegistry {}

describe('Registry.Base', () => {
	describe('Class tests', () => {
		test('getInstance returns the same instance', () => {
			const registry = TestRegistry.getInstance();

			expect(TestRegistry.getInstance()).toBe(registry);
		});

		test('registerItem calls register on the instance', () => {
			const registry = TestRegistry.getInstance();
			const args = ['foo', 'bar'];

			jest.spyOn(registry, 'register').mockImplementation(() => {});

			TestRegistry.registerItem(...args);

			expect(registry.register).toHaveBeenCalledWith(...args);
		});

		test('register returns a fn that calls register on the instance', () => {
			const registry = TestRegistry.getInstance();

			jest.spyOn(registry, 'register').mockImplementation(() => {});

			const fn = TestRegistry.register('type');

			fn('item');

			expect(registry.register).toHaveBeenCalledWith('type', 'item');
		});

		test('Throws if constructed directly', () => {
			expect(() => new BaseRegistry()).toThrow();
		});
	});
});
