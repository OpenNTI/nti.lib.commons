/* eslint-env jest */
import getFilesFromDataTransferItems from '../get-files-from-data-transfer-items';

function createItem (name, isDirectory) {
	return {
		kind: 'file',
		getAsFile () { return name; },
		webkitGetAsEntry () { return {isDirectory}; }
	};
}

describe('getFilesFromDataTransferItems tests', () => {
	test ('Returns files, and excludes directories', () => {
		const name = 'file-name';
		const data = {
			0: createItem(name),
			1: createItem('directory', true),
			2: {kind: 'not-a-file'},
			length: 3
		};
		const files = getFilesFromDataTransferItems(data);

		expect(files[0]).toEqual(name);
		expect(files.length).toEqual(1);
	});
});
