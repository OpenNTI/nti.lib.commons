import URL from 'url';
import QueryString from 'querystring';

export default function appendQueryParams (uri, params) {
	const url = URL.parse(uri);

	url.search = QueryString.stringify({
		...QueryString.parse(url.search),
		...params
	});

	return url.format();
}
