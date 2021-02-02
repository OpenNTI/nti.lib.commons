const DefaultSeparator = '.';

function getPathParts (path) {
	if (!path) {
		return {
			path: '',
			sep: DefaultSeparator
		};
	}

	if (typeof path === 'string') {
		return {
			path,
			sep: DefaultSeparator
		};
	}

	return path;
}

/**
 * Given a pathConfig, return a normalized path.
 *
 * this was pulled out into here to handle more complicated paths than just key names.
 * but for not key names are all we are going to support.
 * 
 * @param  {string|Object} pathConfig - pathConfig to normalize
 * @returns {Object} - the normalized path
 */
export default function parsePath (pathConfig) {
	const {path, sep} = getPathParts(pathConfig);

	return {
		parts: path.split(sep),
		sep
	};
}