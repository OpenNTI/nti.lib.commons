import isEmpty from 'isempty';

export function ensure(a) {
	return a[Symbol.iterator] ? a : isEmpty(a, true) ? [] : [a];
}
