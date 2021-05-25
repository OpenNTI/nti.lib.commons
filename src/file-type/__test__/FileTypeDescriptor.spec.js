/* eslint-env jest */
import Logger from '@nti/util-logger';

import { parseMimeType, parseExtension } from '../FileTypeDescriptor.js';

const logger = Logger.get('lib:FileTypeDescriptor');

describe('FileTypeDescriptor', () => {
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

	test('Parsing extension', () => {
		expect(parseExtension.bind(null)).toThrowError(
			TypeError,
			'Argument should be a string representing an extension'
		);
		expect(parseExtension.bind(null, 'json.*')).toThrowError(
			TypeError,
			'Argument cannot have wildcards, other than at the beginning'
		);
		expect(parseExtension.bind(null, '*.j*')).toThrowError(
			TypeError,
			'Argument cannot have wildcards, other than at the beginning'
		);

		const extA = parseExtension('*.pdf');
		const extB = parseExtension('.pdf');

		expect(extA.isWild).not.toBeTruthy();
		expect(extB.isWild).not.toBeTruthy();

		expect(extA.extension).toBe('.pdf');
		expect(extB.extension).toBe('.pdf');

		expect(extA.mask.extension).toBe('*.pdf');
		expect(extB.mask.extension).toBe('*.pdf');

		//TODO: lookup mimeType for extensions
		// expect(extA.mimeType).toBe('application/pdf');
		// expect(extB.mimeType).toBe('application/pdf');
		// expect(extA.mask.mimeType).toBe('application/pdf');
		// expect(extB.mask.mimeType).toBe('application/pdf');

		expect(extA.match).toBeDefined();
		expect(extB.match).toBeDefined();
		expect(extA.match({ name: 'Report.pdf' })).toBeTruthy();
		expect(extB.match({ name: 'Report.pdf' })).toBeTruthy();
		expect(extA.match({ name: 'Report.doc' })).not.toBeTruthy();
		expect(extB.match({ name: 'Report.doc' })).not.toBeTruthy();
	});

	test('Parsing MimeType', () => {
		expect(parseMimeType.bind(null)).toThrowError(
			TypeError,
			'Argument was not a valid MimeType'
		);
		expect(parseMimeType.bind(null, 'type*/*')).toThrowError(
			TypeError,
			'Argument was not a valid MimeType'
		);
		expect(parseMimeType.bind(null, '*/subtype')).toThrowError(
			TypeError,
			'Argument was not a valid MimeType'
		);

		const mime = parseMimeType('application/pdf');

		expect(mime.isWild).not.toBeTruthy();

		expect(mime.mimeType).toBe('application/pdf');
		expect(mime.mask.mimeType).toBe('application/pdf');

		// TODO: lookup extensions for mimeTypes
		// expect(mime.extension).toBe('.pdf');
		// expect(mime.mask.extension).toBe('*.pdf');

		expect(mime.match).toBeDefined();

		expect(mime.match({ type: 'application/pdf' })).toBeTruthy();
		expect(mime.match({ type: 'application/json' })).not.toBeTruthy();
	});

	test('Parsing wildcard extension', () => {
		expect(parseExtension.bind(null, '*')).not.toThrow();

		jest.spyOn(logger, 'warn');
		const oldWild = parseExtension('*.*');
		expect(logger.warn).toHaveBeenCalledWith(
			'For file wildcards, use *, not *.*'
		);

		const wild = parseExtension('*');

		expect(wild.isWild).toBeTruthy();
		expect(wild.extension).toBe('');
		expect(wild.mask.extension).toBe('*');

		expect(wild.match).toBeDefined();
		expect(wild.match({ name: 'Report.pdf' })).toBeTruthy();
		expect(wild.match({ name: 'Report.doc' })).toBeTruthy();

		expect(oldWild.isWild).toBeTruthy();
		expect(oldWild.extension).toBe('');
		expect(oldWild.mask.extension).toBe('*');

		expect(oldWild.match).toBeDefined();
		expect(oldWild.match({ name: 'Report.pdf' })).toBeTruthy();
		expect(oldWild.match({ name: 'Report.doc' })).toBeTruthy();
	});

	test('Parsing wildcard MimeType', () => {
		expect(parseMimeType.bind(null, '*/*')).not.toThrow();

		const wild = parseMimeType('*/*');

		expect(wild.isWild).toBeTruthy();

		expect(wild.mimeType).toBe('*/*');
		expect(wild.mask.mimeType).toBe('*/*');

		expect(wild.match).toBeDefined();
		expect(wild.match).toBeDefined();
		expect(wild.match({ type: 'application/pdf' })).toBeTruthy();
		expect(wild.match({ type: 'text/plain' })).toBeTruthy();
	});
});
