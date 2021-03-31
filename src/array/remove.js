export function remove(arr, at) {
	return [...arr.slice(0, at), ...arr.slice(at + 1)];
}
