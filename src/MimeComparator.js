import MediaTyper from 'media-typer';
import equals from './object-equals';

export const ANY = {
	type: '*',
	subtype: '*',
	suffix: '*'
};

export function get (x) {
	const WILD_SUBTYPE = 'wild-sub-type-key';
	try {
		return MediaTyper.parse(x);
	}
	catch (e) {
		if (x === '*/*') {
			return ANY;
		} else if (x) {
			const maybeSubTypeWild = x.replace(/\*$/g, WILD_SUBTYPE);
			const subTypeWild = (maybeSubTypeWild !== x) && get (maybeSubTypeWild);
			if (subTypeWild && subTypeWild.subtype === WILD_SUBTYPE) {
				delete subTypeWild.parameters;
				Object.assign(subTypeWild, {
					subtype: '*',
					suffix: void 0
				});

				return subTypeWild;
			}
		}
	}

	return void 0;
}


export default class MimeComparator {

	constructor (mime) {
		this.type = get(mime);
	}

	typeMatches (o) {
		return this.partMatches('type', o);
	}

	subTypeMatches (o) {
		return this.partMatches('subtype', o);
	}

	suffixMatches (o) {
		return this.partMatches('suffix', o) || this.type.suffix == null;
	}

	parametersMatch (o) {
		const {parameters} = this.type;
		const {parameters: other} = o;
		return !parameters || equals(parameters || {}, other);
	}

	partMatches (key, o) {
		const {type} = this;
		if (type === ANY || o === ANY) {
			return true;
		}

		return type && o && (type[key] === o[key] || type[key] === '*' || o[key] === '*');
	}


	/**
	 * Equality
	 *
	 * @param  {string} type mimeType string
	 * @return {Boolean} True if type equals our type.
	 */
	matches (type) {
		type = get(type);
		if (type === ANY) {
			return true;
		}

		return this.typeMatches(type)
			&& this.subTypeMatches(type)
			&& this.suffixMatches(type)
			&& this.parametersMatch(type);
	}


	/**
	 * Identity
	 * type/subtype is type/subtype, but not type/subtype+suffix
	 *
	 * type/subtype+suffix is type/subtype+suffix and type/subtype
	 *
	 * star/star is star/star but not type/subtype.
	 * type/star is type/star but not type/subtype.
	 *
	 * @param  {string} type mimeType string
	 * @return {Boolean} if the type is the same as ours.
	 */
	is (type) {
		const other = get(type);
		const self = this.type;

		return Object.keys(self).every(key =>
			self[key] == null
			|| other[key] === self[key]
			|| (
				key === 'parameters'
				&& this.parametersMatch(other)
			)
		);
	}


	toString () {
		let {type} = this;

		if (!type) { return 'invalid'; }

		if (type === ANY) { return '*/*'; }

		if (type.subtype === '*') { return `${type.type}/*`; }

		return MediaTyper.format(type);
	}
}
