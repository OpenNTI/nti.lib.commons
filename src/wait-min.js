import wait, {SHORT, LONG} from './wait';

export {SHORT, LONG};


/**
 * Given a minimum duration, return a function that when called
 * will return a promise that fulfills with its first arg after
 * at least the duration given has passed.
 *
 * @param  {Number} minWait the min time to wait
 * @return {Function} see description
 */
export default function (minWait) {
	const start = new Date();

	return result => {
		const end = new Date();
		const duration = end - start;

		if (duration < minWait) {
			return wait(minWait - duration)
				.then(() => result);
		}

		return Promise.resolve(result);
	};
}
