import tinycolor from 'tinycolor2';

import { normalizeToHSL } from './utils';

function callOnce(method) {
	let result = null;

	return () => {
		if (!result) {
			result = method();
		}

		return result;
	};
}

function getRGB(hsl, rgb, update) {
	const value = callOnce(() => rgb ?? tinycolor(hsl).toRgb());

	const setR = r => update({...value(), r });
	const setG = g => update({...value(), g });
	const setB = b => update({...value(), b });
	const setA = a => update({...value(), a });

	return {
		get r() {
			return value().r;
		},
		get red() {
			return value().r;
		},
		setR,
		setRed: setR,

		get g() {
			return value().g;
		},
		get green() {
			return value().g;
		},
		setG,
		setGreen: setG,

		get b() {
			return value().b;
		},
		get blue() {
			return value().b;
		},
		setB,
		setBlue: setB,

		get a() {
			return value().a;
		},
		get alpha() {
			return value().a;
		},
		setA,
		setAlpha: setA,

		toString() {
			return tinycolor(hsl).toRgbString();
		},
	};
}

function getHex(hsl, hex, update) {
	const value = callOnce(() => hex ?? tinycolor(hsl).toHex());

	return {
		get value() {
			return value();
		},

		toString() {
			return tinycolor(hsl).toHexString();
		},

		setValue: (newHex) => update(newHex)
	};
}

function getHSL(hsl, hslOverride, update) {
	const value = callOnce(() => hslOverride ?? hsl);

	const setH = h => update({...value(), h });
	const setS = s => update({...value(), s });
	const setL = l => update({...value(), l });
	const setA = a => update({...value(), a });

	return {
		get h() {
			return value().h;
		},
		get hue() {
			return value().h;
		},
		setH,
		setHue: setH,

		get s() {
			return value().s;
		},
		get saturation() {
			return value().s;
		},
		setS,
		setSaturation: setS,

		get l() {
			return value().l;
		},
		get lightness() {
			return value().l;
		},
		setL,
		setLightness: setL,

		get a() {
			return value().a;
		},
		get alpha() {
			return value().a;
		},
		setA,
		setAlpha: setA,

		toString() {
			return tinycolor(hsl).toHslString();
		},
	};
}

function getHSV(hsl, hsvOverride, update) {
	const value = callOnce(() => {
		if (hsvOverride) { return hsvOverride; }

		const hsv = tinycolor(hsl).toHsv();
		return { h: hsl.h, s: hsv.s, v: hsv.v };
	});

	const setH = h => update({...value(), h });
	const setS = s => update({...value(), s });
	const setV = v => update({...value(), v });
	const setA = a => update({...value(), a });

	return {
		get h() {
			return value().h;
		},
		get hue() {
			return value().h;
		},
		setH,
		setHue: setH,

		get s() {
			return value().s;
		},
		get saturation() {
			return value().s;
		},
		setS,
		setSaturation: setS,

		get v() {
			return value().v;
		},
		get brightness() {
			return value().v;
		},
		setV,
		setBrightness: setV,

		get a() {
			return value().a;
		},
		get alpha() {
			return value().a;
		},
		setA,
		setAlpha: setA,

		toString() {
			return tinycolor(hsl).toHSLString();
		},
	};
}

function getAccessibilityMethods(hsl) {
	const color = hsl && tinycolor(hsl);

	return {
		isReadable: (other, size) => (
			color ?
				tinycolor.isReadable(color,	other, size || { level: 'AA', size: 'small' }) :
				false
		),
		readability: other => color ? tinycolor.readability(color, other) : null,
	};
}

function isSameColor(a, b) {
	return a.hex.toString() === b.hex.toString();
}

function normalize (color, format) {
	try {
		return {hsl: normalizeToHSL(color, format), valid: true};
	} catch (e) {
		return {valid: false};
	}
}

class Color { isColor = true }
class InvalidColor extends Color { invalid = true }

function getColorMethods(input, format, source) {
	if (input.isColor) {
		return input;
	}

	const {hsl, valid} = normalize(input, format);
	const color = valid ? new Color() : new InvalidColor();

	const getSource = valid ?
		() => hsl :
		type => (type === format ? input : source?.hsl.toString());

	const getOverride = valid ?
		() => null :
		type => (type === format ? input : null);

	const getUpdate = (type) => ((updated) => getColorMethods(updated, type, color.source));

	const hexColor = getHex(getSource('hex'), getOverride('hex'), getUpdate('hex'));
	const rgbColor = getRGB(getSource('rgb'), getOverride('rgb'), getUpdate('rgb'));
	const hslColor = getHSL(getSource('hsl'), getOverride('hsl'), getUpdate('hsl'));
	const hsvColor = getHSV(getSource('hsv'), getOverride('hsv'), getUpdate('hsv'));

	Object.defineProperties(color, {
		isSameColor: {value: other => other?.isColor && isSameColor(color, other)},
		a11y: {value: getAccessibilityMethods(hsl)},

		hex: {value: hexColor},
		rgb: {value: rgbColor},
		hsl: {value: hslColor},
		hsv: {value: hsvColor},

		source: {value: valid ? color : source, enumerable: false}
	});

	return color;
}

CreateColor.fromCSS = css => getColorMethods(css, 'css');
CreateColor.fromHex = hex => getColorMethods(hex, 'hex');
CreateColor.fromRGB = (r, g, b, a = 1) => getColorMethods({ r, g, b, a }, 'rgb');
CreateColor.fromHSL = (h, s, l) => getColorMethods({ h, s, l }, 'hsl');
CreateColor.fromHSV = (h, s, v) => getColorMethods({ h, s, v }, 'hsv');
export default function CreateColor(color, format) {
	return getColorMethods(color, format);
}
