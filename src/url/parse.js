export const NULL_PROTO = 'file:/';

const isDefault = (x, y) =>
	!`${x}`.startsWith('file:') &&
	(!y || y === NULL_PROTO || !`${y}`.startsWith('file:'));

const filterString = (str, defaulted) =>
	defaulted ? str.replace(/^file:\/\//, '') : str;

class LooseURL extends URL {
	static NULL_PROTO = NULL_PROTO;
	constructor(uri, ref = NULL_PROTO) {
		let defaulted = isDefault(uri, ref);
		let parsed;
		try {
			parsed = new URL(uri, new URL(ref, NULL_PROTO));
		} catch {
			parsed = new URL('file://null');
			defaulted = true;
		}

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

	get origin() {
		const base = super.origin;
		return this._defaulted && /^file:/.test(base) ? 'null' : base;
	}

	toString() {
		return filterString(super.toString(), this._defaulted);
	}
}

export const parse = (uri, b) => new LooseURL(uri, b);
