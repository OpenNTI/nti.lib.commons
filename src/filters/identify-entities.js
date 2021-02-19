import { getID } from './identify-objects';

export default function matcherFactory(object) {
	const otherId = getID(object);
	const otherName = object && object.Username;

	return function (o) {
		const idOrName = getID(o);

		return idOrName === otherId || idOrName === otherName;
	};
}
