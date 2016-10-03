import Logger from 'nti-util-logger';
const logger = Logger.get('common:jsx-utils');

/**
 * Utilitity to abstract away setting raw content on a React component. The content MUST be valid and sanitized.
 *
 * @param {String} x - A sanitized & valid HTML string.
 *
 * @return {Object} An object with one prop: dangerouslySetInnerHTML setup to contain your raw content value.
 */
export const rawContent = x => ({dangerouslySetInnerHTML: {__html: x}});

export function sanitizeContent (html) {
	let d = document.createElement('div');
	return (d.innerHTML = html, d.innerHTML);
}


export function getRefHandler (parentRef, localRef) {
	const fn = getRefHandler;
	const REF_HANDLERS = fn.map || (fn.map = new WeakMap());

	if (typeof parentRef !== 'function') {
		if (parentRef) {
			logger.error('getRefHandler has stollen your ref! sorry :/');
		}
		return localRef;
	}

	let h = REF_HANDLERS.get(parentRef);
	if (!h) {
		h = (x) => {parentRef(x); localRef(x);};
		REF_HANDLERS.set(parentRef, h);
	}
	return h;
}
