/* eslint-env jest */
import Color from '../Color';

describe('Color', () => {
	describe('HEX', () => {
		test('accepts different formats', () => {
			const test = '3fb3f6';

			const matches = color => {
				expect(color.hex.value).toEqual(test);
			};

			matches(Color.fromHex(test));
			matches(Color(`#${test}`));
		});

		test('updates correct value', () => {
			const color = Color.fromHex('3fb3f6');

			expect(color.hex.setValue('ebf7ed').hex.value).toEqual('ebf7ed');
		});
	});

	describe('RGB', () => {
		test('accepts different formats', () => {
			const test = { r: 255, g: 125, b: 25 };

			const matches = color => {
				expect(color.rgb.r).toEqual(test.r);
				expect(color.rgb.red).toEqual(test.r);

				expect(color.rgb.g).toEqual(test.g);
				expect(color.rgb.green).toEqual(test.g);

				expect(color.rgb.b).toEqual(test.b);
				expect(color.rgb.blue).toEqual(test.b);
			};

			matches(Color.fromRGB(test.r, test.g, test.b));
			matches(Color(`rgb(${test.r}, ${test.g}, ${test.b})`));
		});

		test('updates correct value', () => {
			const color = Color.fromRGB(100, 100, 100, 1);

			expect(color.rgb.setR(200).rgb.r).toEqual(200);
			expect(color.rgb.setG(200).rgb.g).toEqual(200);
			expect(color.rgb.setB(200).rgb.b).toEqual(200);
			expect(color.rgb.setA(0.5).rgb.a).toEqual(0.5);
		});
	});

	describe('HSL', () => {
		test('accepts different formats', () => {
			const test = {h: 180, s: 0.5, l: 0.5};

			const matches = color => {
				expect(color.hsl.h).toEqual(test.h);
				expect(color.hsl.hue).toEqual(test.h);

				expect(color.hsl.s).toEqual(test.s);
				expect(color.hsl.saturation).toEqual(test.s);

				expect(color.hsl.l).toEqual(test.l);
				expect(color.hsl.lightness).toEqual(test.l);
			};

			matches(Color.fromHSL(test.h, test.s, test.l));
			matches(Color(`hsl(${test.h},${test.s},${test.l})`));
		});

		test('updates correct value', () => {
			const color = Color.fromHSL(180, 0.5, 0.5);

			expect(color.hsl.setH(300).hsl.h).toEqual(300);
			expect(color.hsl.setS(0.75).hsl.s).toEqual(0.75);
			expect(color.hsl.setL(0.75).hsl.l).toEqual(0.75);
		});
	});

	describe('HSV', () => {
		test('accepts different formats', () => {
			const test = {h: 0, s: 1, v: 1};

			const matches = color => {
				expect(color.hsv.h).toEqual(test.h);
				expect(color.hsv.hue).toEqual(test.h);

				expect(color.hsv.s).toEqual(test.s);
				expect(color.hsv.saturation).toEqual(test.s);

				expect(color.hsv.v).toEqual(test.v);
				expect(color.hsv.brightness).toEqual(test.v);
			};

			matches(Color.fromHSV(test.h, test.s, test.v));
			matches(Color(`hsv(${test.h},${test.s},${test.v})`));
		});
	});

	describe('Accessibility', () => {
		describe('reports correct readability', () => {
			test('compared with hex', () => {
				const white = Color.fromCSS('white');
				const black = Color.fromCSS('black');

				expect(() => white.a11y.isReadable('#000')).not.toThrow();
				expect(white.a11y.isReadable('#000')).toEqual(true);
				expect(white.a11y.isReadable('#fff')).toEqual(false);
				expect(white.a11y.isReadable('#ccc')).toEqual(false);
				expect(white.a11y.isReadable('#999')).toEqual(false);
				expect(white.a11y.isReadable('#666')).toEqual(true);

				expect(black.a11y.isReadable('#000')).toEqual(false);
				expect(black.a11y.isReadable('#fff')).toEqual(true);
				expect(black.a11y.isReadable('#333')).toEqual(false);
				expect(black.a11y.isReadable('#666')).toEqual(false);
				expect(black.a11y.isReadable('#999')).toEqual(true);
			});

			test('compared with instance', () => {
				const hotpink = Color.fromCSS('#ff0088');
				const purple = Color.fromCSS('#5c1a72');

				expect(hotpink.a11y.isReadable(purple)).toEqual(true);
			});
		});
	});

	describe('Invalid Colors', () => {
		test('making invalid', () => {
			const color = Color.fromRGB(400, 150, 150);

			expect(color.invalid).toBeTruthy();
			expect(color.rgb.r).toBe(400);
			expect(color.rgb.g).toBe(150);
			expect(color.rgb.b).toBe(150);
		});

		test('making valid invalid', () => {
			const color = Color.fromRGB(150, 150, 150);
			const invalid = color.rgb.setR(400);

			expect(invalid.invalid).toBeTruthy();
			expect(invalid.rgb.r).toBe(400);
			expect(invalid.rgb.g).toBe(150);
			expect(invalid.rgb.b).toBe(150);
		});

		test('making invalid valid', () => {
			const invalid = Color.fromRGB(400, 150, 150);
			const color = invalid.rgb.setR(150);

			expect(color.invalid).toBeFalsy();
			expect(color.rgb.r).toBe(150);
			expect(color.rgb.g).toBe(150);
			expect(color.rgb.b).toBe(150);
		});
	});
});
