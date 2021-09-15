export const NULL_PROTO = 'file:/';

const isDefault = (x, y) =>
	!`${x}`.startsWith('file:') &&
	(!y || y === NULL_PROTO || !`${y}`.startsWith('file:'));

const filterString = (str, defaulted) =>
	defaulted ? str.replace(/^file:\/\//, '') : str;

class LooseURL extends URL {
	static NULL_PROTO = NULL_PROTO;
	constructor(uri, ref = NULL_PROTO) {
		const defaulted = isDefault(uri, ref);
		const parsed = new URL(uri, new URL(ref, NULL_PROTO));

		super(parsed.toString());
		this._defaulted = defaulted;
	}

	get protocol() {
		const t = super.protocol;
		return this._defaulted && t === 'file:' ? null : t;
	}

	set protocol(scheme) {
		if (!this.host) {
			throw new Error('Setting protocol with no host... set host first.');
		}
		super.protocol = scheme;
	}

	toString() {
		return filterString(super.toString(), this._defaulted);
	}
}

export const parse = (uri, b) => new LooseURL(uri, b);
