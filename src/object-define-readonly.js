export default function readOnly (value, enumerable = false) {
	return {configurable: true, enumerable, writable: false, value};
}
