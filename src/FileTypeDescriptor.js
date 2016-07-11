import Mime, {ANY} from './MimeComparator';
import Logger from 'nti-util-logger';

const logger = Logger.get('lib:FileTypeDescriptor');

/*
 * type FileTypeDescriptor {
 *     isWild: Boolean
 *     [extention]: String
 *     [mimeType]: String
 *     mask: Object {
 *         [extention]: String
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
 * Once we can look up mimeTypes from extensions, and lookup cannonical/default
 * extensions for mimeTypes we can enforce extention and mimeType to always be
 * defined instead of one or the other.
 */



export function parseExtention (extention) {
	const WILDCARD = '*';
	const WILD = /\*/g;
	const OLD_WILD = /\*\.\*/g;

	if (typeof extention !== 'string') {
		throw new TypeError('Argument should be a string representing an extention');
	}

	if (OLD_WILD.test(extention)) {
		logger.warn('For file wildcards, use *, not *.*');
		extention = extention.replace(OLD_WILD, '*'); //replace *.* with *. This for backwards compatibility.
	}

	if (
		WILD.test(extention) && (
			!extention.startsWith('*') ||
			(extention.match(WILD).length > 1 && extention !== WILDCARD)
		)
	) {
		throw new TypeError('Argument cannot have wildcards, other than at the beginning');
	}

	const normalize = x => x[0] === '.' ? x : `.${x}`;
	const stripWild = x => x.replace(WILD, '');

	const normal = normalize(stripWild(extention));
	const isWild = normal === '.';

	return {
		isWild,
		extention: isWild ? '' : normal,
		mask: {
			extention: `*${isWild ? '' : normal}`
		},

		match: (file) => file && (isWild || String(file.name).endsWith(normal)),

		raw: extention
	};
}


export function parseMimeType (mimeType) {
	const mime = new Mime(mimeType);
	if (String(mime) === 'invalid') {
		throw new TypeError('Argument was not a valid MimeType');
	}

	const isWild = mime.type === ANY || Object.values(mime.type).some(x => '*' === x);

	return {
		isWild,
		mimeType: String(mime),
		mask: {
			mimeType: String(mime),
			...mime.type
		},

		match: (file) => file && (mime.matches(String(file.type))),

		raw: mimeType
	};
}
