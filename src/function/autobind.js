/**
 * Reassigns the named keys of the scope with functions bound-to the scope.
 *
 * @param  {*} scope      any value you want to bind to.
 * @param  {string} methods Names of menthods on the {scope} to bind.
 * @returns {void}
 */
export function autobind (scope, ...methods) {
	if (!scope) {
		throw new Error('Must supply a scope!');
	}

	for (let fn of methods) {
		scope[fn] = scope[fn].bind(scope);
	}
}
