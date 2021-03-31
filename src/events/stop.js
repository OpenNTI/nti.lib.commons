export function stop(e) {
	if (!e) {
		return;
	}
	e.preventDefault();
	e.stopPropagation();
}
