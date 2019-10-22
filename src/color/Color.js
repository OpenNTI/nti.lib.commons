import tinycolor from 'tinycolor2';

function callOnce (method) {
	let result = null;

	return () => {
		if (!result) {
			result = method();
		}

		return result;
	};
}

function update (oldValue, u) {
	const newValue = {...oldValue, ...u};

	return getColorMethods(tinycolor(newValue));
}

function getRGBMethods (color) {
	const value = callOnce(() => color.toRgb());

	const setR = r => update(value(), {r});
	const setG = g => update(value(), {g});
	const setB = b => update(value(), {b});
	const setA = a => update(value(), {a});

	return {
		get r () { return value().r; },
		get red () { return value().r; },
		setR,
		setRed: setR,

		get g () { return value().g; },
		get green () { return value().g; },
		setG,
		setGreen: setG,

		get b () { return value().b; },
		get blue () { return value().b; },
		setB,
		setBlue: setB,

		get a () { return value().a; },
		get alpha () { return value().a; },
		setA,
		setAlpha: setA,

		toString () {
			return color.toRgbString();
		}
	};
}

function getHexMethods (color) {
	const value = callOnce(() => color.toHex());

	return {
		get value () { return value(); },

		toString () {
			return color.toHexString();
		}
	};
}

function getHSLMethods (color) {
	const value = callOnce(() => color.toHsl());

	const setH = h => update(value(), {h});
	const setS = s => update(value(), {s});
	const setL = l => update(value(), {l});
	const setA = a => update(value(), {a});

	return {
		get h () { return value().h; },
		get hue () { return value().h; },
		setH,
		setHue: setH,

		get s () { return value().s; },
		get saturation () { return value().s; },
		setS,
		setSaturation: setS,

		get l () { return value().l; },
		get lightness () { return value().l; },
		setL,
		setLightness: setL,

		get a () { return value().a; },
		get alpha () { return value().a; },
		setA,
		setAlpha: setA,

		toString () {
			return color.toHslString();
		}
	};
}

function getHSVMethods (color) {
	const value = callOnce(() => color.toHsv());

	const setH = h => update(value(), {h});
	const setS = s => update(value(), {s});
	const setV = v => update(value(), {v});
	const setA = a => update(value(), {a});

	return {
		get h () { return value().h; },
		get hue () { return value().h; },
		setH,
		setHue: setH,

		get s () { return value().s; },
		get saturation () { return value().s; },
		setS,
		setSaturation: setS,

		get v () { return value().v; },
		get brightness () { return value().v; },
		setV,
		setBrightness: setV,

		get a () { return value().a; },
		get alpha () { return value().a; },
		setA,
		setAlpha: setA,

		toString () {
			return color.toHSLString();
		}
	};
}

function getAccessibilityMethods (color) {
	return {
		isReadable: other => tinycolor.isReadable(color, other),
	};
}

function isSameColor (a, b) {
	return a.hex.toString() === b.hex.toString();
}

function getColorMethods (color) {
	if (!color.isValid()) { throw new Error('Invalid Color'); }

	const colorMethods = {
		isColor: true,
		isSameColor: (colorB) => colorB && colorB.isColor && isSameColor(colorMethods, colorB),
		hex: getHexMethods(color),
		rgb: getRGBMethods(color),
		hsl: getHSLMethods(color),
		hsv: getHSVMethods(color),
		a11y: getAccessibilityMethods(color)
	};

	return colorMethods;
}

Color.fromCSS = (css) => getColorMethods(tinycolor(css));
Color.fromHex = (hex) => getColorMethods(tinycolor(hex));
Color.fromRGB = (r, g, b, a = 1) => getColorMethods(tinycolor({r, g, b, a}));
Color.fromHSL = (h, s, l) => getColorMethods(tinycolor({h, s, l}));
Color.fromHSV = (h, s, v) => getColorMethods(tinycolor({h, s, v}));
export default function Color (color) {
	return getColorMethods(tinycolor(color));
}