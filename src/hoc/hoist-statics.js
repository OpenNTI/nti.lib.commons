const RESERVED_STATICS = {
	name: true,
	length: true,
	prototype: true,
	caller: true,
	callee: true,
	arguments: true,
	arity: true,

	//React statics:
	childContextTypes: true,
	contextTypes: true,
	defaultProps: true,
	displayName: true,
	getDefaultProps: true,
	getDerivedStateFromProps: true,
	mixins: true,
	propTypes: true,
	type: true,
};

const unwrapComponentReference = x =>
	(x && unwrapComponentReference(x.WrappedComponent)) || x;

/**
 * Hoists static properties from the composed component onto the composer component.
 *
 * @param  {Component|Function} composer       The component that is composing "component"
 * @param  {Component|Function} component      The component that is being composed.
 * @param  {string} displayName    A name to give the composer compoennt.
 * @param  {Object|string[]} [blacklist={}] A list of property names to NOT hoist.
 * @returns {Component|Function} the composer, modified.
 */
export function hoistStatics(composer, component, displayName, blacklist = {}) {
	const { create, assign, defineProperty } = Object;
	const cmp = composer;
	//Make sure we always deal with the original component...not a wrapper.
	const target = unwrapComponentReference(component);

	cmp.displayName = `${displayName}(${
		target.displayName || target.name || 'Component'
	})`;
	cmp.WrappedComponent = target;

	const keys = [
		...Object.getOwnPropertyNames(target),
		...Object.getOwnPropertySymbols(target),
	];

	if (Array.isArray(blacklist)) {
		const blacklistKeys = blacklist;

		blacklist = {};
		for (let k of blacklistKeys) {
			blacklist[k] = true;
		}
	}

	for (let key of keys) {
		if (RESERVED_STATICS[key] || blacklist[key] || cmp[key] != null) {
			continue;
		}

		try {
			defineProperty(
				cmp,
				key,
				assign(create(null), {
					get: () => target[key],
					set: s => (target[key] = s),
				})
			);
		} catch (e) {
			//eslint-disable-next-line no-console
			console.warn(
				'There was an error hoisting static %s for %s over %o\nReason: %o',
				key,
				displayName,
				target,
				e.stack || e.message || e
			);
		}
	}

	return cmp;
}
