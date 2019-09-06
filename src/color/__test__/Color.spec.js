/* eslint-env jest */
import Color from '../Color';

describe('Color', () => {
	describe('RGB', () => {
		test('accepts different formats', () => {
			const test = {r: 255, g: 125, b: 25};

			const matches = (color) => {
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
});