/* eslint-env jest */
import MapRegistry from '../Map';
import {Default} from '../Constants';

class TestRegistry extends MapRegistry {}

describe('Registry.Map tests', () => {
	describe('Class tests', () => {
		test('getInstance returns the same instance', () => {
			const registry = TestRegistry.getInstance();

			expect(TestRegistry.getInstance()).toBe(registry);
		});

		test('registerItem calls register on the instance', () => {
			const registry = TestRegistry.getInstance();
			const args = ['foo', 'bar'];

			jest.spyOn(registry, 'register');

			TestRegistry.registerItem(...args);

			expect(registry.register).toHaveBeenCalledWith(...args);
		});

		test('register returns a fn that calls register on the instance', () => {
			const registry = TestRegistry.getInstance();

			jest.spyOn(registry, 'register');

			const fn = TestRegistry.register('type');

			fn('item');

			expect(registry.register).toHaveBeenCalledWith('type', 'item');
		});

		test('Throws if constructed directly', () => {
			expect(() => new MapRegistry()).toThrow();
		});
	});

	describe('Instance tests', () => {
		test('Returns correct item for type', () => {
			const registry = new TestRegistry();
			const items = ['a', 'b', 'c', 'd', 'e'];

			for (let item of items) {
				registry.register(item, item);
			}

			registry.register(Default, 'default');

			for (let item of items) {
				expect(registry.getItemFor(item)).toEqual(item);
			}
		});

		test('Handles multiple keys for same item', () => {
			const registry = new TestRegistry();
			const item = 'this is the item';
			const keys = ['a', 'b', 'c', 'd', 'e'];

			registry.register(keys, item);

			for (let key of keys) {
				expect(registry.getItemFor(key)).toEqual(item);
			}
		});

		test('Returns nothing if no key matches and not default item', () => {
			const registry = new TestRegistry();
			const items = ['a', 'b', 'c', 'd', 'e'];

			for (let item of items) {
				registry.register(item, item);
			}

			expect(registry.getItemFor('f')).toBeFalsy();
		});

		test('Returns default if no key matches', () => {
			const registry = new TestRegistry();
			const items = ['a', 'b', 'c', 'd', 'e'];
			const defaultValue = 'default';

			for (let item of items) {
				registry.register(item, item);
			}

			registry.register(Default, defaultValue);

			expect(registry.getItemFor('f')).toBe(defaultValue);
			expect(registry.getItemFor('g')).toBe(defaultValue);
			expect(registry.getItemFor('h')).toBe(defaultValue);
			expect(registry.getItemFor('i')).toBe(defaultValue);
		});

		test('Throws if duplicate keys are added', () => {
			const registry = new TestRegistry();

			registry.register('a', 'a');

			expect(() => registry.register('a', 'b')).toThrow();
		});
	});
});
