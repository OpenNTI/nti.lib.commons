export function buffer(delay, requestFactory) {
	let abort = null;

	const requestWrapper = new Promise((fulfill, reject) => {
		const makeRequest = () => {
			const req = requestFactory();
			abort = () => {
				// NOTE: Once we are here, our buffer has elapsed, we cannot guarantee the promise will abort...
				if (!req.abort) {
					throw new Error('Cannot abort');
				}
				// attempt the abort...
				req.abort();
			};
			fulfill(req);
		};

		const delayId = setTimeout(makeRequest, delay);

		abort = () => {
			clearTimeout(delayId);
			reject('aborted');
		};
	});

	requestWrapper.abort = () => abort();

	return requestWrapper;
}
