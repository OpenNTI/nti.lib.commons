const PROP_TYPES_KEY = 'propTypes';

/**
 * Stip props from a set. ()
 *
 * @method restProps
 * @param  {Component|Function} T The Component that declares a static propTypes property
 * @param  {Object}  props Props in.
 * @returns {Object} Props minus the props defined on T.propTypes
 */
export function restProps(T, { ...props } = {}) {
	for (let prop of Object.keys((T || {})[PROP_TYPES_KEY] || {})) {
		delete props[prop];
	}

	return props;
}
