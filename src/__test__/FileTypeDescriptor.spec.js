import {parseMimeType, parseExtention} from '../FileTypeDescriptor';

describe('FileTypeDescriptor', () => {

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

	it ('Parsing extention', () => {

		expect(parseExtention.bind(null)).toThrowError(TypeError, 'Argument should be a string representing an extention');
		expect(parseExtention.bind(null, 'json.*')).toThrowError(TypeError, 'Argument cannot have wildcards, other than at the beginning');
		expect(parseExtention.bind(null, '*.j*')).toThrowError(TypeError, 'Argument cannot have wildcards, other than at the beginning');

		const extA = parseExtention('*.pdf');
		const extB = parseExtention('.pdf');

		expect(extA.isWild).not.toBeTruthy();
		expect(extB.isWild).not.toBeTruthy();

		expect(extA.extention).toBe('.pdf');
		expect(extB.extention).toBe('.pdf');

		expect(extA.mask.extention).toBe('*.pdf');
		expect(extB.mask.extention).toBe('*.pdf');

		//TODO: lookup mimeType for extensions
		// expect(extA.mimeType).toBe('application/pdf');
		// expect(extB.mimeType).toBe('application/pdf');
		// expect(extA.mask.mimeType).toBe('application/pdf');
		// expect(extB.mask.mimeType).toBe('application/pdf');

		expect(extA.match).toBeDefined();
		expect(extB.match).toBeDefined();
		expect(extA.match({name: 'Report.pdf'})).toBeTruthy();
		expect(extB.match({name: 'Report.pdf'})).toBeTruthy();
		expect(extA.match({name: 'Report.doc'})).not.toBeTruthy();
		expect(extB.match({name: 'Report.doc'})).not.toBeTruthy();
	});

	it ('Parsing MimeType', () => {
		expect(parseMimeType.bind(null)).toThrowError(TypeError, 'Argument was not a valid MimeType');
		expect(parseMimeType.bind(null, 'type*/*')).toThrowError(TypeError, 'Argument was not a valid MimeType');
		expect(parseMimeType.bind(null, '*/subtype')).toThrowError(TypeError, 'Argument was not a valid MimeType');

		const mime = parseMimeType('application/pdf');

		expect(mime.isWild).not.toBeTruthy();

		expect(mime.mimeType).toBe('application/pdf');
		expect(mime.mask.mimeType).toBe('application/pdf');

		// TODO: lookup extensions for mimeTypes
		// expect(mime.extention).toBe('.pdf');
		// expect(mime.mask.extention).toBe('*.pdf');


		expect(mime.match).toBeDefined();

		expect(mime.match({type: 'application/pdf'})).toBeTruthy();
		expect(mime.match({type: 'application/json'})).not.toBeTruthy();
	});

	it ('Parsing wildcard extention', () => {

		expect(parseExtention.bind(null, '*.*')).not.toThrow();

		const wild = parseExtention('*.*');

		expect(wild.isWild).toBeTruthy();

		expect(wild.extention).toBe('');
		expect(wild.mask.extention).toBe('*.*');

		expect(wild.match).toBeDefined();
		expect(wild.match).toBeDefined();
		expect(wild.match({name: 'Report.pdf'})).toBeTruthy();
		expect(wild.match({name: 'Report.doc'})).toBeTruthy();
	});

	it ('Parsing wildcard MimeType', () => {

		expect(parseMimeType.bind(null, '*/*')).not.toThrow();

		const wild = parseMimeType('*/*');

		expect(wild.isWild).toBeTruthy();

		expect(wild.mimeType).toBe('*/*');
		expect(wild.mask.mimeType).toBe('*/*');

		expect(wild.match).toBeDefined();
		expect(wild.match).toBeDefined();
		expect(wild.match({type: 'application/pdf'})).toBeTruthy();
		expect(wild.match({type: 'text/plain'})).toBeTruthy();
	});
});
