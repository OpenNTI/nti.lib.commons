export default function removeAt (arr, at) {
	return [...arr.slice(0, at), ...arr.slice(at + 1)];
}
