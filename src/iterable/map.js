export function* map(iterable, fn) {
	let counter = 0;
	for (let item of Array.from(iterable)) {
		yield fn(item, counter++);
	}
}
