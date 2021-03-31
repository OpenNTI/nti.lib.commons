import { mixin } from './mixin.js';

const TARGET = Symbol();

export class Proxy {
	constructor(target, properties, ...mixins) {
		this[TARGET] = target;
		for (let m of mixins) {
			mixin(this, m);
		}

		for (let prop of properties) {
			Object.defineProperty(this, prop, {
				enumerable: false,
				configurable: false,
				set: n => {
					target[prop] = n;
				},
				get() {
					let val = target[prop];

					if (typeof val === 'function') {
						val = val.bind(target);
					}

					return val;
				},
			});
		}
	}
}
