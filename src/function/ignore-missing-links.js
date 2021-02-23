export async function ignoreMissingLink(e) {
	if (e instanceof Promise) {
		return e.catch(ignoreMissingLink);
	}

	if ((e.message || e) !== 'No Link') {
		throw e;
	}
}
