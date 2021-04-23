/// <reference path="./index.d.ts" />
const IsFunction = x => typeof x === 'function';

/**
 * @template T
 * @typedef {(target:T) => T} Decorator
 */

/**
 * Decorators were applied inside out. This function is intended to assist the
 * existing syntax from:
 * <pre><code>
 * export default
 * \@foo
 * \@bar
 * class Thing {}
 * </code></pre>
 *
 * to:
 * <pre><code>
 * class Thing {}
 * export default decorate({target: Thing, with:[foo, bar]})
 * </code></pre>
 *
 * @template T
 * @param {T} target - The target class
 * @param {Decorator<T>[]} decorators - list of decorators, last one is applied first. (inside out application)
 * @returns {T} target (as mutated or replaced by the decorators)
 */
export function decorate(target, decorators) {
	if (decorators.length === 0 || !decorators.every(IsFunction) || !target) {
		throw new TypeError('Invalid arguments to decorate()');
	}

	// handle the inside-out nature of decorators
	decorators.reverse();

	/** @type {Decorator[]} (decorators) */
	for (const decorator of decorators) {
		if (decorator.length > 1) {
			throw TypeError(
				'Invalid decorator. It should only take one argument. (the target)'
			);
		}
		target = decorator(target) || target;
	}

	return target;
}
