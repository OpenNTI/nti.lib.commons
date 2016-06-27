export const getID = o => (typeof o === 'object' && o.getID) ? o.getID() : o;

export default function matcherFactory (object) {
	return function (o) {
		const id = getID(o);
		const otherId = getID(object);

		return id === otherId;
	};
}
