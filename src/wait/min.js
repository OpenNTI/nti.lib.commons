import { wait } from './wait.js';

/**
 * Given a minimum duration, return a function that when called
 * will return a promise that fulfills with its first arg after
 * at least the duration given has passed.
 *
 * @param  {number} minWait the min time to wait
 * @returns {Function} see description
 */
export function min(minWait) {
	const start = new Date();

	return result => {
		const end = new Date();
		const duration = end - start;

		if (duration < minWait) {
			return wait(minWait - duration).then(() => result);
		}

		return Promise.resolve(result);
	};
}
