export function awaitWrapper(waitOn, method) {
	return async function (...args) {
		await waitOn;
		return method.apply(this || null, args);
	};
}
