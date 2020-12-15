import Base from './Base';
import {Default} from './Constants';

const ITEMS = Symbol('Items');

/**
 * A base class for registries that use handlers.
 * Should never be used directly, only extended.
 */
export default class HandlerRegistry extends Base {
	constructor () {
		super();

		if (this.constructor === HandlerRegistry) { throw new Error('Do not user HandlerRegistry directly, should be subclassed'); }

		this[ITEMS] = [];
	}


	register (key, handler) {
		if (key === Default) {
			this[Default] = handler;
		}

		this[ITEMS].push({
			key,
			handler
		});
	}


	getItem (...args) {
		for (let item of this[ITEMS]) {
			const {handler, key} = item;

			if (typeof key === 'function' && key(...args)) {
				return handler;
			}
		}

		return this[Default];
	}
}
