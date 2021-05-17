/**
 * This is the Suspense wrapper for async fetching/resolving.
 * Use this to make a reader so that you can read a value as
 * if it were sync.
 *
 * @template T
 * @param {Promise<T>} promise
 * @returns {{
 *  read: () => T
 * }}
 */
export function toReader(promise) {
	let status = 'pending';
	let result;
	const suspender = promise.then(
		r => {
			status = 'success';
			result = r;
		},
		e => {
			status = 'error';
			result = e;
		}
	);
	return {
		read() {
			if (status === 'pending') {
				throw suspender;
			} else if (status === 'error') {
				throw result;
			} else if (status === 'success') {
				return result;
			}
		},
	};
}
