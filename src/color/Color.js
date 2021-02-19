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

function update(oldValue, updatedValue) {
	return getColorMethods({ ...oldValue, ...updatedValue });
}

function getRGB(hsl) {
	const value = callOnce(() => tinycolor(hsl).toRgb());

	const setR = r => update(value(), { r });
	const setG = g => update(value(), { g });
	const setB = b => update(value(), { b });
	const setA = a => update(value(), { a });

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

function getHex(hsl) {
	const value = callOnce(() => tinycolor(hsl).toHex());

	return {
		get value() {
			return value();
		},

		toString() {
			return tinycolor(hsl).toHexString();
		},
	};
}

function getHSL(hsl) {
	const value = callOnce(() => hsl);

	const setH = h => update(value(), { h });
	const setS = s => update(value(), { s });
	const setL = l => update(value(), { l });
	const setA = a => update(value(), { a });

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

function getHSV(hsl) {
	const value = callOnce(() => {
		const hsv = tinycolor(hsl).toHsv();
		return { h: hsl.h, s: hsv.s, v: hsv.v };
	});

	const setH = h => update(value(), { h });
	const setS = s => update(value(), { s });
	const setV = v => update(value(), { v });
	const setA = a => update(value(), { a });

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
	const color = tinycolor(hsl);

	return {
		isReadable: (other, size) =>
			tinycolor.isReadable(
				color,
				other,
				size || { level: 'AA', size: 'small' }
			),
		readability: other => tinycolor.readability(color, other),
	};
}

function isSameColor(a, b) {
	return a.hex.toString() === b.hex.toString();
}

function getColorMethods(color) {
	if (color.isColor) {
		return color;
	}

	const hsl = normalizeToHSL(color);

	const colorMethods = {
		isColor: true,
		isSameColor: colorB =>
			colorB && colorB.isColor && isSameColor(colorMethods, colorB),
		hex: getHex(hsl),
		rgb: getRGB(hsl),
		hsl: getHSL(hsl),
		hsv: getHSV(hsl),
		a11y: getAccessibilityMethods(hsl),
	};

	return colorMethods;
}

Color.fromCSS = css => getColorMethods(css);
Color.fromHex = hex => getColorMethods(hex);
Color.fromRGB = (r, g, b, a = 1) => getColorMethods({ r, g, b, a });
Color.fromHSL = (h, s, l) => getColorMethods({ h, s, l });
Color.fromHSV = (h, s, v) => getColorMethods({ h, s, v });
export default function Color(color) {
	return getColorMethods(color);
}
