const _ = (...x) => new Promise(r => setTimeout(r, ...x));
const __ = (...x) => new Promise((_, r) => setTimeout(r, ...x));

/**
 * Continuously call the given callback until it does not throw.
 *
 * I really tried to come up with a better name, as I loath dangling
 * phrases like this, but its one word, not a partial sentence... AND
 * I couldn't think of another without bloating the invocation signature.
 *
 * @param {() => any} fun
 * @param {Object=} options
 * @param {number} options.delay The delay between invocations
 * @param {number} options.timeout The maximum time this can wait.
 */
export async function _for(fun, { timeout = 5000, delay = 1 } = {}) {
	const timeoutRabbit = __(timeout, 'timeout');

	let last;
	for (;;) {
		try {
			await Promise.race([timeoutRabbit, Promise.resolve(fun())]);
			return;
		} catch (e) {
			if (e === 'timeout') {
				throw new Error('Timeout out waiting for function', {
					cause: last,
				});
			}
			last = e;
			await _(delay);
		}
	}
}
