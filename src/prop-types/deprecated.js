export default function deprecated(props, propName, componentName) {
	if (props[propName] != null) {
		return new Error(
			`Used a deprecated prop "${propName}". See ${componentName} component for for details.`
		);
	}
}

deprecated.isRequired = function () {
	throw new Error('Deprecated fields cannot be required.');
};
