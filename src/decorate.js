const IsFunction = x => typeof x === 'function';

/**
 * Decorators were applied inside out. This function is intended to assist the
 * existing syntax from:
 * <pre><code>
 * export default
 * @foo
 * @bar
 * class Thing {}
 * </code></pre>
 *
 * to:
 * <pre><code>
 * class Thing {}
 * export default decorate({target: Thing, with:[foo, bar]})
 * </code></pre>
 *
 * @param {*} target - The target class
 * @param {Object|Function[]} spec - the decoration specification
 * @param {Function[]} spec.with - list of decorators, last one is applied first. (inside out application)
 * @returns {*} target (as mutated or replaced by the decorators)
 */
export function decorate (target, spec) {
	const {with: decorators = (Array.isArray(spec) ? spec : [])} = spec || {};
	if (decorators.length === 0 || !decorators.every(IsFunction) || !target) {
		throw new TypeError('Invalid arguments to decorate()');
	}

	// handle the inside-out nature of decorators
	decorators.reverse();

	for (const decorator of decorators) {
		if(decorator.length > 1) {
			throw TypeError('Invalid decorator. It should only take one argument. (the target)');
		}
		target = decorator(target) || target;
	}

	return target;
}
