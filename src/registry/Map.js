import {Default} from './Constants';

const INSTANCE = Symbol.for('Instance');
const ITEMS = Symbol('Items');

/**
 * A base class for registries that use maps.
 * Should never be used directly, only extended.
 */
export default class MapRegistry {
	/**
	 * A decorator to register a class as the item for given types
	 * @param  {[String]|String} types the type to register the decorated item for
	 * @return {Function}              function for the decorator to call
	 */
	static register (types) {
		const registry = this;

		return function decorator (item) {
			registry.registerItem(types, item);
		};
	}

	/**
	 * Return a the same instance of the registry
	 * @return {MapRegistry} instance of MapRegistry
	 */
	static getInstance () {
		const Register = this;

		this[INSTANCE] = this[INSTANCE] || new Register;

		return this[INSTANCE];
	}

	/**
	 * Register an item for the types on the shared instance
	 * @param  {[String]|String} types the types to register for
	 * @param  {Object} item     the item for the types
	 * @return {void}
	 */
	static registerItem (types, item) {
		return this.getInstance().register(types, item);
	}

	constructor () {
		if (this.constructor === MapRegistry) { throw new Error('Do not use MapRegistry directly, should be subclassed.'); }

		this[ITEMS] = {};
	}

	register (types, item) {
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

	getItemFor (type) {
		return this[ITEMS][type] || this[ITEMS][Default];
	}
}

