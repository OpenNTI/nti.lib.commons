export default function hide(o, keys = Object.keys(o)) {
	for (let key of keys) {
		const desc = Object.getOwnPropertyDescriptor(o, key);
		if (desc) {
			desc.enumerable = false;
			delete o[key];
			Object.defineProperty(o, key, desc);
		}
	}
}
