import { wait } from './wait.js';

/**
 * Given a minimum duration, return a function that when called
 * will return a promise that fulfills with its first arg after
 * at least the duration given has passed.
 *
 * @param  {number} minWait the min time to wait
 * @returns {()=>void & {cancel: () => void}}
 */
export function min(minWait) {
	const start = new Date();
	let waiting;

	const waiter = async result => {
		const end = new Date();
		const duration = end - start;

		if (duration < minWait) {
			waiting = wait(minWait - duration);
			await waiting;
		}

		return result;
	};

	waiter.cancel = () => waiting?.cancel();

	return waiter;
}
