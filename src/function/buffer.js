/**
 * Waits a short amount of time before invoking a function. If called again before the timeout,
 * the timeout is canceled and recreated.
 *
 * @param {number} time Time in milliseconds to wait before invoking the function.
 * @param {Function} fn the function to execute.
 * @returns {void}
 */
export function buffer(time, fn) {
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

	const clear = () => (clearTimeout(id), (id = null));

	const f = function () {
		//must be a regular function (not an arrow function)
		const args = arguments;

		clear();

		call = () => ((id = null), (call = null), fn.apply(this, args));
		id = setTimeout(call, time);
	};

	f.buffered = time;

	f.cancel = clear;

	f.flush = () => {
		clear();

		if (call) {
			call();
		}
	};

	Object.defineProperty(f, 'pending', {
		get() {
			return !!id;
		},
	});

	return f;
}
