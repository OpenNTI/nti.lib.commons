const MAP = Symbol('Handler Map');
const LIST = Symbol('Handler List');
const ADD_TO_MAP = Symbol('Add To Map');
const ADD_TO_LIST = Symbol('Add To List');

function getTypeFor(obj) {
	return obj.MimeType || obj.type || obj;
}

export class Handlers {
	/**
	 * Create a utility to map types of objects to handlers
	 *
	 * handlers should have a static handles field
	 * which can be either:
	 * 1) String
	 * 2) [String]
	 * 3) Function //Takes the object and returns a boolean
	 *
	 * @param  {any[]} handlers the list of handlers
	 * @returns {Object}         Handlers utility
	 */
	constructor(handlers) {
		this[MAP] = {};
		this[LIST] = [];

		for (let handler of handlers) {
			this.addHandler(handler);
		}
	}

	[ADD_TO_MAP](handler) {
		let { handles } = handler;

		if (!Array.isArray(handles)) {
			handles = [handles];
		}

		for (let handle of handles) {
			if (!this[MAP][handle]) {
				this[MAP][handle] = [handler];
			} else {
				this[MAP][handle].push(handler);
			}
		}
	}

	[ADD_TO_LIST](handler) {
		this[LIST].push(handler);
	}

	addHandler(handler) {
		if (!handler.handles) {
			throw new Error('Invalid handler');
		} else if (typeof handler.handles === 'function') {
			this[ADD_TO_LIST](handler);
		} else {
			this[ADD_TO_MAP](handler);
		}
	}

	/**
	 * Get all the handlers for an object
	 *
	 * @param  {Object|string} obj the object to get the handlers for
	 * @returns {any[]}     the handlers passed in for that object
	 */
	getAllHandlers(obj) {
		const type = getTypeFor(obj);
		let handlers = this[MAP][type] || [];

		for (let handler of this[LIST]) {
			if (handler.handles(obj)) {
				handlers.push(handler);
			}
		}

		return handlers;
	}

	/**
	 * Get a single handler for an object
	 * If we have more than one just return the first one
	 *
	 * @param  {Object|string} obj the object to get the handler for
	 * @returns {any}     the handler passed in for that object
	 */
	getHandler(obj) {
		const handlers = this.getAllHandlers(obj);

		return handlers[0];
	}
}
