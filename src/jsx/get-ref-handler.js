import Logger from 'nti-util-logger';
const logger = Logger.get('lib:jsx:ref-handler');


export default function getRefHandler (parentRef, localRef) {
	const fn = getRefHandler;
	const REF_HANDLERS = fn.map || (fn.map = new WeakMap());

	if (typeof parentRef !== 'function') {
		if (parentRef) {
			logger.error(`Non-function ref value (${parentRef}) has been dropped. Use a callback instead.`);
		}
		return localRef;
	}

	let h = REF_HANDLERS.get(localRef);
	if (!h) {
		h = (x) => {parentRef(x); localRef(x);};
		REF_HANDLERS.set(localRef, h);
	}
	return h;
}
