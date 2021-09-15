import Logger from '@nti/util-logger';
import { isNTIID } from '@nti/lib-ntiids';

import * as url from '../url/index.js';
import { hash } from '../string/hash.js';

const logger = Logger.get('lib:rebase-references');

const CORS_BUSTER_REGEX =
	/(\S+)\s*=\s*"(((\/[^"/]+\/)||\/)resources\/[^?"]*?)"/gim;

const isDataURI = RegExp.prototype.test.bind(/^data:/i);
const isSrc = RegExp.prototype.test.bind(/src/i);
const isYouTube = RegExp.prototype.test.bind(/youtube/i);
const isHrefParam = RegExp.prototype.test.bind(/name="href"/i);

const paramValue = /value="([^"]+)"/gim;

export function bustCorsForResources(htmlString, name, value) {
	//Look for things we know come out of a different domain
	//and append a query param.  This allows us to, for example,
	//add a query param related to our location host so that
	//we can tell amazon's caching servers to take that into consideration

	//We are looking for an attribute whose values is a quoted string
	//referencing resources.  We ignore urls with a protocol or protocol-less
	//absolute urls (//).  We look for relative urls rooted at resources.
	//or absolute urls whose first folder is resources.

	return htmlString.replace(
		CORS_BUSTER_REGEX,
		(_, attr, uri) => `${attr}="${uri}?${name}=${value}"`
	);
}

export function rebaseReferences(htmlString, basePath) {
	const location = global.location || {}; //This will not work well on server-side render

	const checkValue = _url => {
		const anchor = _url.pathname == null && _url.hash !== null;

		const fullyQualified = Boolean(
			_url.protocol || _url.host || _url.origin !== 'null'
		);
		return fullyQualified || anchor || isDataURI(_url);
	};

	function fixReferences(original, attr, uri) {
		const _url = url.parse(uri);

		if (isSrc(attr) && isYouTube(uri)) {
			const params = new URLSearchParams([
				['html5', 1],
				['enablejsapi', 1],
				['autohide', 1],
				['modestbranding', 1],
				['rel', 0],
				['showinfo', 0],
				['wmode', 'opaque'],
				['origin', location.protocol + '//' + location.host],
			]);

			_url.search = params.toString();
			_url.protocol = 'https';

			return `src="${_url.toString()}"`;
		}

		if (!checkValue(_url)) {
			logger.debug(
				'Content Still has non-fullyqualified HTML references! (assumed base: %s, ref: %s)',
				basePath,
				uri
			);

			uri = url.resolve(basePath, uri);
		}

		//inline
		return checkValue(_url) ? original : `${attr}="${uri}"`;
	}

	function fixParamValue(original, uri) {
		if (isNTIID(uri)) {
			return original;
		}

		const _url = url.parse(uri);

		const fixed = checkValue(_url) ? uri : url.resolve(basePath, uri);

		return `value="${fixed}"`;
	}

	function maybeFixParam(original, attributes) {
		if (!isHrefParam(attributes)) {
			return original;
		}

		return original.replace(paramValue, fixParamValue);
	}

	const envSalt = '';
	const locationHash = hash(location.hostname + envSalt);

	htmlString = bustCorsForResources(htmlString, 'h', locationHash);
	htmlString = htmlString.replace(
		/(src|href|poster|data-source-wrapped)="(.*?)"/gim,
		fixReferences
	);
	htmlString = htmlString.replace(/<param([^>]+)>/gim, maybeFixParam);
	return htmlString;
}
