
export default function sanitizeContent (html) {
	let d = document.createElement('div');
	return (d.innerHTML = html, d.innerHTML);
}
