import isAsyncFunction from './is-async';
import awaitWrapper from './await-wrapper';


/**
 * Make all async functions defined on the prototype wait on the given task.
 *
 * @param {*} scope - The class instance to modify
 * @param {AsyncFunction} asyncFunction - A task to perform that all async functions in class instance should wait for.
 * @returns {void}
 */
export default function awaitAsyncCall (scope, asyncFunction) {
	if (!scope || !scope.constructor || !scope.constructor.prototype) {
		throw new Error('Invalid scope');
	}
	if (!isAsyncFunction(asyncFunction)) {
		throw new Error('Invalid async function argument');
	}

	const resolve = asyncFunction();

	const members = Object.keys(Object.getOwnPropertyDescriptors(scope.constructor.prototype));
	for (const member of members) {
		if (isAsyncFunction(scope[member])) {
			scope[member] = awaitWrapper(resolve, scope[member]);
		}
	}
}
