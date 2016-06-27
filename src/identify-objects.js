export const getID = o => typeof o === 'object' ? o.getID() : o;

export default function matcherFactory (object) {
	return function (o) {
		const idOrName = getID(o);
		const otherId = getID(object);

		return idOrName === otherId;
	};
}
