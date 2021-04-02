export function* render(iterable, map) {
	let counter = 0;
	for (let item of Array.from(iterable)) {
		yield map(item, counter++);
	}
}
