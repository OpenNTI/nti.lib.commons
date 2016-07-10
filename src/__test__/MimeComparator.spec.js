import MimeComparator from '../MimeComparator';

describe('MimeComparator', () => {

	it ('new MimeComparator()', () => {
		const o = new MimeComparator();

		expect(String(o)).toBe('invalid');
		expect(o.type).toBe(void 0);
	});

	it ('*/* matches any other mime', () => {
		const o = new MimeComparator('*/*');

		expect(o.is('foo/bar')).not.toBeTruthy();
		expect(o.is('*/*')).toBeTruthy();
		expect(o.matches('foo/bar')).toBeTruthy();
		expect(o.matches('foo/bar+baz')).toBeTruthy();
		expect(String(o)).toBe('*/*');

		expect(o.matches('foo/bar')).toBeTruthy();
	});


	it ('matches type/subtype to type/subtype and type/subtype+prefix', () => {
		const A = 'type/subtype';
		const B = 'type/subtype+prefix';
		const C = 'type/subtype+prefix2';

		const o = new MimeComparator(A);
		expect(String(o)).toBe(A);

		expect(o.is(A)).toBeTruthy();
		expect(o.is(B)).toBeTruthy();
		expect(o.is(C)).toBeTruthy();

		expect(o.matches(A)).toBeTruthy();
		expect(o.matches(B)).toBeTruthy();
		expect(o.matches(C)).toBeTruthy();
	});


	it ('does not match type/subtype to type/subtype2, type2/subtype, nor type/subtype2+prefix', () => {
		const A = 'type/subtype';

		const X = 'type/subtype2';
		const Y = 'type2/subtype';
		const Z = 'type2/subtype2+meh';

		const o = new MimeComparator(A);

		expect(o.is(X)).not.toBeTruthy();
		expect(o.is(Y)).not.toBeTruthy();
		expect(o.is(Z)).not.toBeTruthy();

		expect(o.matches(X)).not.toBeTruthy();
		expect(o.matches(Y)).not.toBeTruthy();
		expect(o.matches(Z)).not.toBeTruthy();
	});


	it ('matches type/subtype+prefix to type/subtype+prefix but not type/subtype nor type/subtype+prefix2', () => {
		const A = 'type/subtype+prefix';
		const B = 'type/subtype';
		const C = 'type/subtype+prefix2';

		const o = new MimeComparator(A);
		expect(String(o)).toBe(A);

		expect(o.is(A)).toBeTruthy();
		expect(o.is(B)).not.toBeTruthy();
		expect(o.is(C)).not.toBeTruthy();

		expect(o.matches(A)).toBeTruthy();
		expect(o.matches(B)).not.toBeTruthy();
		expect(o.matches(C)).not.toBeTruthy();
	});

	it ('matches "type/subtype+prefix; param=xyz" to "type/subtype+prefix; param=xyz" but not type/subtype, type/subtype+prefix2, nor "type/subtype+prefix; param=abc"', () => {
		const A = 'type/subtype+prefix; charset=utf-8; foo=bar';
		const B = 'type/subtype+prefix; charset=utf-8; foo=baz';
		const C = 'type/subtype+prefix';
		const D = 'type/subtype';
		const E = 'type/subtype+prefix2';

		const o = new MimeComparator(A);
		expect(String(o)).toBe(A);

		expect(o.is(A)).toBeTruthy();
		expect(o.is(B)).not.toBeTruthy();
		expect(o.is(C)).not.toBeTruthy();
		expect(o.is(D)).not.toBeTruthy();
		expect(o.is(E)).not.toBeTruthy();

		expect(o.matches(A)).toBeTruthy();
		expect(o.matches(B)).not.toBeTruthy();
		expect(o.matches(C)).not.toBeTruthy();
		expect(o.matches(D)).not.toBeTruthy();
		expect(o.matches(E)).not.toBeTruthy();
	});


	it ('matches type/* to type/subtypeA and type/subtypeB as well as type/subtype+prefix', () => {
		const o = new MimeComparator('type/*');

		const A = 'type/subtypeA';
		const B = 'type/subtypeB';
		const C = 'type/subtype+prefix';
		const D = 'type2/subtype';


		expect(o.is(A)).not.toBeTruthy();
		expect(o.is(B)).not.toBeTruthy();
		expect(o.is(C)).not.toBeTruthy();
		expect(o.is(D)).not.toBeTruthy();

		expect(o.matches(A)).toBeTruthy();
		expect(o.matches(B)).toBeTruthy();
		expect(o.matches(C)).toBeTruthy();
		expect(o.matches(D)).not.toBeTruthy();
	});

	it ('matches type/* to type/subtypeA and type/subtypeB as well as type/subtype+prefix', () => {
		const o = new MimeComparator('type/*');

		const A = 'type/subtypeA';
		const B = 'type/subtypeB';
		const C = 'type/subtype+prefix';
		const D = 'type/subtype+prefix; charset=utf-8 ; foo=bar';
		const E = 'type2/subtype';


		expect(o.is(A)).not.toBeTruthy();
		expect(o.is(B)).not.toBeTruthy();
		expect(o.is(C)).not.toBeTruthy();
		expect(o.is(D)).not.toBeTruthy();
		expect(o.is(E)).not.toBeTruthy();

		expect(o.matches(A)).toBeTruthy();
		expect(o.matches(B)).toBeTruthy();
		expect(o.matches(C)).toBeTruthy();
		expect(o.matches(D)).toBeTruthy();
		expect(o.matches(E)).not.toBeTruthy();
	});

});
