import Base from './Base.js';
import { Default } from './constants.js';

const ITEMS = Symbol('Items');

/**
 * A base class for registries that use handlers.
 * Should never be used directly, only extended.
 */
export default class HandlerRegistry extends Base {
	constructor() {
		super();

		if (this.constructor === HandlerRegistry) {
			throw new Error(
				'Do not user HandlerRegistry directly, should be subclassed'
			);
		}

		this[ITEMS] = [];
	}

	register(key, handler) {
		if (key === Default) {
			this[Default] = handler;
		}

		this[ITEMS].push({
			key,
			handler,
		});
	}

	getRegistration(...args) {
		for (let item of this[ITEMS]) {
			const { key } = item;

			if (typeof key === 'function' && key(...args)) {
				return item;
			}
		}

		return !this[Default]
			? null
			: {
					key: Default,
					handler: this[Default],
					default: true,
			  };
	}

	getItem(...args) {
		const { handler } = this.getRegistration(...args) || {};

		return handler || this[Default];
	}
}

export const Handler = HandlerRegistry;
