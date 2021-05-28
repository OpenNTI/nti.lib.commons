const INSTANCE = Symbol.for('Instance');

/**
 * A base class for registries.
 * Should never be used directly, only extended.
 *
 * @interface
 * @template K, T
 */
export default class Registry {
	/**
	 * This registers items to the singleton instance of this registry.
	 *
	 * @template K, T
	 * @param  {K|K[]} key 		the key to register the item for
	 * @param {T?} item 		if given, registers the item right away. If omitted, a call back is returned (for legacy decorator patterns)
	 * @returns {Function|void} if returning a value, it will be a function for the decorator to call
	 */
	static register(key, item) {
		const registry = this;

		function decorator(v) {
			registry.registerItem(key, v);
		}

		return arguments.length > 1 ? decorator(item) : decorator;
	}

	/**
	 * Return a the same instance of the registry
	 *
	 * @returns {Registry<K,T>} instance of Registry
	 */
	static getInstance() {
		const Register = this;

		this[INSTANCE] = this[INSTANCE] || new Register();

		return this[INSTANCE];
	}

	/**
	 * Register an item for the key on the shared instance
	 *
	 * @template K,T
	 * @param  {K} key the key to register for
	 * @param  {T} item     the item for the key
	 * @returns {void}
	 */
	static registerItem(key, item) {
		return this.getInstance().register(key, item);
	}

	static getItem(...args) {
		return this.getInstance().getItem(...args);
	}

	constructor() {
		if (this.constructor === Registry) {
			throw new Error(
				'Do not use Registry directly, should be subclassed.'
			);
		}
	}

	register() {
		throw new Error('register should be implemented by the subclass.');
	}

	/**
	 * @param {...any} args
	 * @deprecated Use getItem() instead
	 * @returns {T}
	 */
	getItemFor(...args) {
		return this.getItem(...args);
	}

	/**
	 * @abstract
	 * @param {K} key
	 * @returns {T}
	 */
	getItem(key) {
		throw new Error(
			'getItem register should be implemented by the subclass.'
		);
	}
}
