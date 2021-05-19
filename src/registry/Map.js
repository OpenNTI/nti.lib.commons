import Base from './Base.js';
import { Default } from './constants.js';

/**
 * A base class for registries that use maps.
 * Should never be used directly, only extended.
 */
export default class MapRegistry extends Base {
	#items = {};

	constructor() {
		super();

		if (this.constructor === MapRegistry) {
			throw new Error(
				'Do not use MapRegistry directly, should be subclassed.'
			);
		}
	}

	register(types, item) {
		if (!Array.isArray(types)) {
			types = [types];
		}

		for (let t of types) {
			if (this.#items[t]) {
				throw new Error('Overriding existing registry item');
			}

			this.#items[t] = item;
		}
	}

	getItem(type) {
		return this.#items[type] || this.#items[Default];
	}
}

export const Map = MapRegistry;
