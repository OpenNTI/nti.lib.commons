import Base from './Base';
import { Default } from './Constants';

const ITEMS = Symbol('Items');

/**
 * A base class for registries that use maps.
 * Should never be used directly, only extended.
 */
export default class MapRegistry extends Base {
	constructor() {
		super();

		if (this.constructor === MapRegistry) {
			throw new Error(
				'Do not use MapRegistry directly, should be subclassed.'
			);
		}

		this[ITEMS] = {};
	}

	register(types, item) {
		if (!Array.isArray(types)) {
			types = [types];
		}

		for (let t of types) {
			if (this[ITEMS][t]) {
				throw new Error('Overriding existing registry item');
			}

			this[ITEMS][t] = item;
		}
	}

	getItem(type) {
		return this[ITEMS][type] || this[ITEMS][Default];
	}
}
