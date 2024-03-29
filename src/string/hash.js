export function hash(str) {
	let h = 0;
	if (str == null || str === '') {
		return h;
	}

	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		h = (h << 5) - h + c;
		h = h & h; // Convert to 32bit integer
	}
	return h;
}
