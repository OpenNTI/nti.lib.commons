import readOnly from './object-define-readonly';

export default function updateValue (scope, key, value) {
	const desc = Object.getOwnPropertyDescriptor(scope, key) || readOnly(value);
	delete scope[key];
	Object.defineProperty(scope, key, Object.assign({}, desc, {value}));
}
