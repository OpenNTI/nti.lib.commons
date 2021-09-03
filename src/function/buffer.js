//@ts-check

/**
 * @template {() => void} T
 * @typedef {T & object} BufferedFunction
 * @property {number} buffered
 * @property {() => void} cancel
 * @property {() => void} flush
 * @property {boolean} pending
 */

/**
 * Waits a short amount of time before invoking a function. If called again before the timeout,
 * the timeout is canceled and recreated.
 *
 * @template {() => void} T
 * @param {number} time Time in milliseconds to wait before invoking the function.
 * @param {T} fn the function to execute.
 * @param {(buffering: boolean) => void} [notify] A function to call when buffering starts, and called buffering ends. (do not rely on call counts. Its only guaranteed to be called att least once per state.)
 * @returns {BufferedFunction<T>}
 */
export function buffer(time, fn, notify) {
	if (typeof time !== 'number') {
		throw new Error(
			'Illegal Argument: The first argument must be a number'
		);
	}
	if (typeof fn !== 'function') {
		throw new Error(
			'Illegal Argument: The second argument must be a function'
		);
	}

	let id = null;
	let call = null;

	const clear = () => (notify?.(false), clearTimeout(id), (id = null));

	const f = function () {
		//must be a regular function (not an arrow function)
		const args = arguments;

		clear();

		call = () => (clear(), (call = null), fn.apply(this, args));
		notify?.(true);
		id = setTimeout(call, time);
	};

	f.buffered = time;

	f.cancel = clear;

	f.flush = () => call?.();

	Object.defineProperty(f, 'pending', {
		get() {
			return !!id;
		},
	});

	return f;
}

buffer.inline = function inline(tracker, time, fn, ...args) {
	const key = Symbol.for('bufferTimeoutId');
	clearTimeout(tracker[key]);
	tracker[key] = setTimeout(() => {
		delete tracker[key];
		fn(...args);
	}, time);
};
