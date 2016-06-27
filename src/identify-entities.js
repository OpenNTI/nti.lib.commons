import {getID} from './identify-objects';

export default function matcherFactory (object) {
	return function (o) {
		const idOrName = getID(o);
		const otherId = getID(object);
		const otherName = object && object.Username;

		return idOrName === otherId || idOrName === otherName;
	};
}
