import tinycolor from 'tinycolor2';

/**
 * tinycolor2 is converting the color to RGB to store it. Which is
 * fine in most cases... However, there are cases (#000, #fff) that
 * the conversion to and from RGB is losing any Hue information. Since
 * our input editors are setting the Hue we need to keep track of that
 * information. So we are going to use HSL as the storage format.
 *
 * @param  {Object|string} input the color to normalize to HSL
 * @returns {Object}       the hsl description of the input
 */
export default function normalizeToHSL(input) {
	const color = tinycolor(input);

	if (!color.isValid()) {
		throw new Error('Invalid Color');
	}

	const hsl = color.toHsl();

	if (input.h != null && input.s != null && input.l != null) {
		return { h: input.h, s: input.s, l: input.l };
		//The H in HSL and HSV are the same value, so if we are given HSV
		//keep the input H.
	} else if (input.h != null && input.s != null && input.v != null) {
		return { h: input.h, s: hsl.s, l: hsl.l };
	}

	return hsl;
}
