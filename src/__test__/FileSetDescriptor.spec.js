import FileSet from '../FileSet';

const MOCK_PDF_FILE = {type: 'application/pdf', name:'Report.pdf', size: 54234};
const MOCK_TXT_FILE = {type: 'text/plain', name:'Report.txt', size: 512};
const MOCK_ZIP_FILE = {type: 'application/zip', name:'Report.zip', size: 1512};

describe('FileSetDescriptor', () => {

	it ('Backwards Compatibility', () => {

		const pdfs = new FileSet(['.pdf'], ['*/*']);

		expect(pdfs.matches(MOCK_PDF_FILE)).toBeTruthy();
		expect(pdfs.matches(MOCK_TXT_FILE)).not.toBeTruthy();
	});

	it ('Empty Accepts Lists accept nothing', () => {

		const pdfs = new FileSet([], []);

		expect(pdfs.matches(MOCK_PDF_FILE)).not.toBeTruthy();
		expect(pdfs.matches(MOCK_TXT_FILE)).not.toBeTruthy();
	});


	it ('Accepts any match in the set of allowed extensions and mimeTypes', () => {

		const pdfs = new FileSet(['.pdf'], ['text/plain']);

		expect(pdfs.matches(MOCK_PDF_FILE)).toBeTruthy();
		expect(pdfs.matches(MOCK_TXT_FILE)).toBeTruthy();
		expect(pdfs.matches(MOCK_ZIP_FILE)).not.toBeTruthy();
	});


});
