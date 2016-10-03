import readOnly from './object-define-readonly';

export default function defineProtected (o) {
	return Object.entries(o).reduce((out, [key, value]) => (out[key] = readOnly(value), out), {});
}