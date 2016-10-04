export default function getFilesFromDataTransferItems (items) {
	return Array.from(items)
			.filter(x => x.kind === 'file' && !isDataTransferItemDirectory(x))
			.map(x => x.getAsFile());
}

export function isDataTransferItemDirectory (item) {
	return item && item.kind === 'file' && item.webkitGetAsEntry && item.webkitGetAsEntry().isDirectory;
}
