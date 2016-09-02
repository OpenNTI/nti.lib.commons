import path from 'path';
import url from 'url';

export default function urlResolve (base, other) {
	base = url.parse(base);
	other = url.parse(other);

	if (other.host == null) {
		for (let prop of ['protocol', 'auth', 'host', 'port', 'hostname']) {
			other[prop] = base[prop];
		}
	}

	if (base.pathname) {
		other.pathname = path.resolve(base.pathname, other.pathname);
	}

	return other.format();
}
