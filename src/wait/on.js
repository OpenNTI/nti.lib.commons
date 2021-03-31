const emptyFunction = () => {};

const NEVER_FAIL = thenable => thenable.then(emptyFunction, emptyFunction);

export function on(pending, timeout) {
	if (!Array.isArray(pending)) {
		pending = [Promise.resolve(pending)];
	}

	return new Promise((resolve, reject) => {
		if (typeof timeout === 'number' && timeout >= 0) {
			let onTimeout = () => {
				resolve = emptyFunction;
				reject('Timeout');
			};

			timeout = setTimeout(onTimeout, timeout);
		}

		Promise.all(pending.map(NEVER_FAIL)).then(() =>
			// Do not pass the resolve function reference to "then"...
			// otherwise it won't be able to be ignored after timeout.
			resolve()
		);
	});
}
