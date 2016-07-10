import array from './ensure-array';
import {parseExtention, parseMimeType} from './FileTypeDescriptor';


/* A class to help classify Accepted File types */
export default class FileSetDescriptor {

	/**
	 * Constructs class and sets up data.
	 *
	 * @param  {string[]} extensions - A list of extensions.
	 * @param  {string[]} mimeTypes - A list of MimeTypes.
	 * @return {void}
	 */
	constructor (extensions, mimeTypes) {

		extensions = array(extensions).map(parseExtention);
		mimeTypes = array(mimeTypes).map(parseMimeType);

		/**
		 * Builds the Set of Descriptors used to identify a file by its "type"
		 *
		 * **Heuristic of exclusions:
		 *   - wildcards in a list void the set.
		 *   - Unless the counter list is empty.
		 *
		 * @param  {FileTypeDescriptor[]} list The list to build the set from.
		 * @param  {FileTypeDescriptor[]} counterList The counterList to examine for emptiness.
		 * @return {Set} The set of FileTypeDescriptors.
		 */
		function buildSet (list, counterList) {
			const wild = x => x.isWild;
			const isWild = list.some(wild);
			const counterListIsEmptyOrWild = counterList.some(wild) || counterList.length === 0;

			return new Set((isWild && !counterListIsEmptyOrWild) ? [] : list);
		}

		Object.assign(this, {
			extensions: buildSet(extensions, mimeTypes),
			mimeTypes: buildSet(mimeTypes, extensions)
		});

		this.rules = new Set([...this.extensions, ...this.mimeTypes]);
	}


	matches = (file) => {
		//ANY match (OR-ing all the remaining extensions and mimeTypes after
		//our "heuristic of exclusions"* to maintain backwards compatibility)
		for (let descriptor of this.rules) {
			if (descriptor.match(file)) {
				return true;
			}
		}

		return false;
	}


	getFileMask () {
		return Array.from(this.rules).map(x => x.mask);
	}
}
