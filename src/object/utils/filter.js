const isObj = x => x?.constructor?.name?.toLowerCase() === 'object';
const isIter = x => Array.isArray(x) || isObj(x);
const getOut = x => Array.isArray(x) ? [] : isObj(x) ? {} : x;
const isEmpty = x => x == null || (Array.isArray(x) && x.length === 0) || (isObj(x) && Object.keys(x).length === 0);

export default function filter (o, fn = (_,x) => x, omitEmpty = false) {

	const out = getOut(o);

	if (isIter(out)) {

		for (let [key, value] of Object.entries(o)) {

			value = fn(key, value);

			if (value === void 0) {
				continue;
			}

			if (isIter(value)) {
				value = filter(value, fn, omitEmpty);
			}

			if (omitEmpty && isEmpty(value)) {
				continue;
			}

			out[key] = value;
		}
	}


	return Array.isArray(out)
		? out.filter(Boolean)
		: out;
}
