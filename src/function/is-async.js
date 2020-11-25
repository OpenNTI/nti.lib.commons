const AsyncFunction = (async () => {}).constructor;
const CanTell = /async/i.test(AsyncFunction.name);

export default function isAsyncFunction (input) {
	return CanTell && typeof input === 'function' && input instanceof AsyncFunction;
}
