import url from 'url';

// #facepalm... Url has a resolve method. sigh.
// TODO: remove this file and use url's resolve.
export default function urlResolve (base, other) {
	return url.parse(base).resolve(other);
}
