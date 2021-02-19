/* eslint-env jest */
import HandlerRegistry from '../Handler';
import { Default } from '../Constants';

class TestRegistry extends HandlerRegistry {}

describe('Registry.Handler', () => {
	test('Returns correct item for type', () => {
		const registry = new TestRegistry();
		const items = ['a', 'b', 'c', 'd', 'e'];

		for (let item of items) {
			registry.register(x => x === item, item);
		}

		registry.register(Default, 'default');

		for (let item of items) {
			expect(registry.getItemFor(item)).toEqual(item);
		}
	});

	test('Returns first handler to return true', () => {
		const registry = new TestRegistry();
		const item = {};

		registry.register(() => true, item);
		registry.register(() => true, 'foo');

		expect(registry.getItemFor('bar')).toEqual(item);
	});

	test('Returns nothing if no handler returns true or default item', () => {
		const registry = new TestRegistry();

		registry.register(() => false, {});
		registry.register(() => false, {});
		registry.register(() => false, {});

		expect(registry.getItemFor('item')).toBeFalsy();
	});

	test('Returns default if no handler returns true', () => {
		const registry = new TestRegistry();
		const defaultValue = 'default';

		registry.register(() => false, {});
		registry.register(() => false, {});
		registry.register(() => false, {});

		registry.register(Default, defaultValue);

		expect(registry.getItemFor('foo')).toEqual(defaultValue);
	});
});
