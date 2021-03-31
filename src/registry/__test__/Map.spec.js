/* eslint-env jest */
import MapRegistry from '../Map.js';
import { Default } from '../constants.js';

class TestRegistry extends MapRegistry {}

describe('Registry.Map tests', () => {
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
