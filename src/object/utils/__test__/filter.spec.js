/* eslint-env jest */
import filter from '../filter';
import set from '../set';

test('base cases', () => {
	const d = new Date();

	expect(filter()).toBeUndefined();
	expect(filter(d)).toBe(d);
	expect(filter(1)).toBe(1);
	expect(filter(0)).toBe(0);
	expect(filter(true)).toBe(true);
	expect(filter(false)).toBe(false);
	expect(filter({})).toEqual({});
	expect(filter({ a: 1, b: 2, c: d })).toEqual({ a: 1, b: 2, c: d });
});

test('filter function', () => {
	//Objects are frozen to catch accidental mutation
	const o = Object.freeze({
		a: 1,
		b: 2,
		c: Object.freeze({
			d: 4,
			e: 5,
		}),
	});

	const o2 = Object.freeze({
		a: 1,
		b: 2,
		c: Object.freeze([1, 2, 3, 4]),
	});

	expect(filter(o, () => {})).toEqual({});
	expect(filter(o, () => 3)).toEqual({ a: 3, b: 3, c: 3 });

	expect(filter(o, (k, v) => (k === 'd' ? void 0 : v))).toEqual({
		a: 1,
		b: 2,
		c: { e: 5 },
	});

	expect(filter(o, (k, v) => (/[de]/.test(k) ? void 0 : v))).toEqual({
		a: 1,
		b: 2,
		c: {},
	});

	expect(filter(o, (k, v) => (/[de]/.test(k) ? void 0 : v), true)).toEqual({
		a: 1,
		b: 2,
	});

	expect(filter(o2, (k, v) => (/[2]/.test(k) ? void 0 : v), true)).toEqual({
		a: 1,
		b: 2,
		c: [1, 2, 4],
	});
});

test('filter function with null-prototype objects', () => {
	const o3 = Object.create(null);
	set(o3, 'theme.login.noLogo', false);
	set(o3, 'assets.login_logo.source', 'data:image/png;base64,');
	set(o3, 'assets.login_logo.href', 'data:image/png;base64,');
	set(o3, 'assets.login_logo.file', {});
	set(o3, 'assets.login_logo.filename', 'poulet_nucleaire-destroy-graph.png');
	set(o3, 'assets.login_logo.MimeType', 'image');

	const fileFilter = (key, value) => {
		const { file, ...v } = value || {};
		if (!file || v.MimeType !== 'image') {
			return value;
		}
	};

	expect(filter(o3, fileFilter, true)).toEqual({
		theme: {
			login: {
				noLogo: false,
			},
		},
	});
});
