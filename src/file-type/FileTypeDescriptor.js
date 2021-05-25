import Logger from '@nti/util-logger';

import { ANY, MimeComparator as Mime } from './MimeComparator.js';

const logger = Logger.get('lib:FileTypeDescriptor');

/*
 * type FileTypeDescriptor {
 *     isWild: Boolean
 *     [extension]: String
 *     [mimeType]: String
 *     mask: Object {
 *         [extension]: String
 *
 *         [mimeType]: String
 *         [type]: String
 *         [subtype]: String
 *         [suffix]: String
 *     }
 *     match (file) : Function (File) -> Boolean
 *     raw: String
 * }
 *
 * Once we can look up mimeTypes from extensions, and lookup canonical/default
 * extensions for mimeTypes we can enforce extension and mimeType to always be
 * defined instead of one or the other.
 */

export function parseExtension(extension) {
	const WILDCARD = '*';
	const WILD = /\*/g;
	const OLD_WILD = /\*\.\*/g;

	if (typeof extension !== 'string') {
		throw new TypeError(
			'Argument should be a string representing an extension'
		);
	}

	if (OLD_WILD.test(extension)) {
		logger.warn('For file wildcards, use *, not *.*');
		extension = extension.replace(OLD_WILD, '*'); //replace *.* with *. This for backwards compatibility.
	}

	if (
		WILD.test(extension) &&
		(!extension.startsWith('*') ||
			(extension.match(WILD).length > 1 && extension !== WILDCARD))
	) {
		throw new TypeError(
			'Argument cannot have wildcards, other than at the beginning'
		);
	}

	const normalize = x => (x[0] === '.' ? x : `.${x}`);
	const stripWild = x => x.replace(WILD, '');

	const normal = normalize(stripWild(extension));
	const isWild = normal === '.';

	return {
		isWild,
		extension: isWild ? '' : normal,
		mask: {
			extension: `*${isWild ? '' : normal}`,
		},

		match: file => file && (isWild || String(file.name).endsWith(normal)),

		raw: extension,
	};
}

export function parseMimeType(mimeType) {
	const mime = new Mime(mimeType);
	if (String(mime) === 'invalid') {
		throw new TypeError('Argument was not a valid MimeType');
	}

	const isWild =
		mime.type === ANY || Object.values(mime.type).some(x => '*' === x);

	return {
		isWild,
		mimeType: String(mime),
		mask: {
			mimeType: String(mime),
			...mime.type,
		},

		match: file => file && mime.matches(String(file.type)),

		raw: mimeType,
	};
}
