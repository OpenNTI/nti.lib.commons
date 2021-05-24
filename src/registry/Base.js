const INSTANCE = Symbol.for('Instance');

/**
 * A base class for registries.
 * Should never be used directly, only extended.
 *
 * @template K, T
 */
export default class Registry {
	/**
	 * A decorator to register a class as the item for given key
	 *
	 * @param  {[string]|string} key the key to register the decorated item for
	 * @returns {Function}              function for the decorator to call
	 */
	static register(key) {
		const registry = this;

		return function decorator(item) {
			registry.registerItem(key, item);
		};
	}

	/**
	 * Return a the same instance of the registry
	 *
	 * @returns {Registry<K,T>} instance of MapRegistry
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
