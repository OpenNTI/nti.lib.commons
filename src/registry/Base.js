const INSTANCE = Symbol.for('Instance');

/**
 * A base class for registries.
 * Should never be used directly, only extended.
 */
export default class Registry {
	/**
	 * A decorator to register a class as the item for given key
	 * @param  {[String]|String} key the key to register the decorated item for
	 * @return {Function}              function for the decorator to call
	 */
	static register (key) {
		const registry = this;

		return function decorator (item) {
			registry.registerItem(key, item);
		}
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
	 * Register an item for the key on the shared instance
	 * @param  {[String]|String} key the key to register for
	 * @param  {Object} item     the item for the key
	 * @return {void}
	 */
	static registerItem (key, item) {
		return this.getInstance().register(key, item);
	}


	constructor () {
		if (this.constructor === Registry) { throw new Error('Do not use Registry directly, should be subclassed.'); }
	}

	register () {
		throw new Error('register should be implemented by the subclass.');
	}

	getItemFor () {
		throw new Error('getItemFor register should be implemented by the subclass.');
	}
}
