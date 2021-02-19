export default function stopEvent(e) {
	if (!e) {
		return;
	}
	e.preventDefault();
	e.stopPropagation();
}
