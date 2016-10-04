import Url from 'url';
import {hash} from '../string';
import Logger from 'nti-util-logger';

const logger = Logger.get('lib:rebase-references');

const CORS_BUSTER_REGEX = /(\S+)\s*=\s*"(((\/[^"\/]+\/)||\/)resources\/[^?"]*?)"/igm;

const isDataURI = RegExp.prototype.test.bind(/^data:/i);
const isSrc = RegExp.prototype.test.bind(/src/i);
const isYouTube = RegExp.prototype.test.bind(/youtube/i);


export function bustCorsForResources (htmlString, name, value) {
	//Look for things we know come out of a different domain
	//and append a query param.  This allows us to, for example,
	//add a query param related to our location host so that
	//we can tell amazon's caching servers to take that into consideration

	//We are looking for an attribute whose valus is a quoted string
	//referenceing resources.  We ignore urls with a protocol or protcolless
	//absolute urls (//).  We look for relative urls rooted at resources.
	//or absolute urls whose first folder is resources.

	return htmlString.replace(CORS_BUSTER_REGEX,
		(_, attr, uri) => `${attr}="${uri}?${name}=${value}"`);
}


export default function rebaseAndSaltReferences (htmlString, basePath) {
	const location = global.location || {};//This will not work well on server-side render

	function fixReferences (original, attr, uri) {
		const url = Url.parse(uri);

		const anchor = url.pathname == null && url.hash !== null;
		const firstChar = (url.pathname || '').charAt(0);
		const absolute = firstChar === '/';

		const fullyQualified = Boolean(url.protocol || url.host || absolute);


		if (isSrc(attr) && isYouTube(uri)) {
			const params = [
				'html5=1',
				'enablejsapi=1',
				'autohide=1',
				'modestbranding=1',
				'rel=0',
				'showinfo=0',
				'wmode=opaque',
				'origin=' + encodeURIComponent(location.protocol + '//' + location.host)
			];

			url.search = params.join('&');
			url.protocol = 'https';

			return `src="${url.format()}"`;
		}

		if (!anchor && !fullyQualified && !isDataURI(url)) {
			logger.warn('Content Still has non-fullyqualified HTML references! (assumed base: %s, ref: %s)', basePath, uri);

			uri = url.parse(basePath).resolve(uri);
		}

		//inline
		return (anchor || fullyQualified || isDataURI(url)) ?
			original : `${attr}="${uri}"`;
	}

	const envSalt = '';
	const locationHash = hash(location.hostname + envSalt);

	htmlString = bustCorsForResources(htmlString, 'h', locationHash);
	htmlString = htmlString.replace(/(src|href|poster|data-source-wrapped)="(.*?)"/igm, fixReferences);
	return htmlString;
}
