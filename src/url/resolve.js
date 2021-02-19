import url from 'url';

export default function resolve(base, other) {
	return url.parse(base).resolve(other);
}
