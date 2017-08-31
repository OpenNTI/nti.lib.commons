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

	const PARENT_REF_MAP = REF_HANDLERS.get(localRef) || new WeakMap();
	REF_HANDLERS.set(localRef, PARENT_REF_MAP);

	const h = PARENT_REF_MAP.get(parentRef) || (x) => {parentRef(x); localRef(x);};
	PARENT_REF_MAP.set(parentRef, h);

	return h;
}
