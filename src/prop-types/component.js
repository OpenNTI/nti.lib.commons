// react-is package comes from 'prop-types'...
// to avoid unnecessary version conflicts,
// we just want this method... from prop-types,
// but its not exposed there...
// eslint-disable-next-line import/no-extraneous-dependencies
import { isValidElementType } from 'react-is';

// https://github.com/facebook/prop-types/issues/200#issuecomment-409391696

class PropTypeError extends Error {}

function getComponentValidator() {
	function checkType(
		isRequired,
		props,
		propName,
		componentName,
		location,
		propFullName
	) {
		const val = props[propName];
		if (val == null) {
			if (isRequired) {
				if (props[propName] === null) {
					return new PropTypeError(
						`The ${location} '${propFullName}' is marked as required in '${componentName}', but its value is 'null'.`
					);
				}
				return new PropTypeError(
					`The ${location} '${propFullName}' is marked as required in '${componentName}', but its value is 'undefined'.`
				);
			}
		} else if (!isValidElementType(val)) {
			return new PropTypeError(
				`Invalid ${location} '${propFullName}' supplied to ${componentName}. Expected a string (for built-in components) or a class/function (for composite components).`
			);
		}
		return null;
	}

	const chainedCheckType = checkType.bind(null, false);
	chainedCheckType.isRequired = checkType.bind(null, true);
	return chainedCheckType;
}

export default getComponentValidator();
