import readOnly from './object-define-readonly';

export default function definePublic (o) {
	return Object.entries(o).reduce((out, [key, value]) => (out[key] = readOnly(value, true), out), {});
}
