import { on } from './on.js';
import { min } from './min.js';
export const SHORT = 300;
export const LONG = 5000;

/**
 *
 * @param {number} milliseconds
 * @returns {Promise<void> & {cancel: () => void}}
 */
export function wait(milliseconds) {
	let abort, timer;
	const waiter = new Promise(
		(resume, f) => (
			(abort = f), (timer = setTimeout(() => resume(), milliseconds || 0))
		)
	);
	waiter.cancel = () => {
		clearTimeout(timer);
		abort?.('canceled');
	};
	return waiter;
}

wait.on = on;
wait.min = min;
wait.SHORT = SHORT;
wait.LONG = LONG;
