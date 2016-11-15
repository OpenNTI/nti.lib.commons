export default function insertAt (arr, item, at) {
	return [...arr.slice(0, at), item, ...arr.slice(at)];
}
