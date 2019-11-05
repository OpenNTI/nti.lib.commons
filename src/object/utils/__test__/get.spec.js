/* eslint-env jest */
import get from '../get';

test ('Safely get values', () => {

	expect(get()).toBe(undefined);
	expect(get(null, 'foo')).toBe(null);
});

test ('Follow optional chaining spec', () => {
	expect(get({foo: {baz: 'bar'}}, 'foo')).toEqual({baz: 'bar'});
	expect(get({foo: {baz: 'bar'}}, 'foo.baz')).toEqual('bar');

	expect(get({foo: {baz: 'bar'}}, 'boo')).toBe(undefined);
	expect(get({foo: null}, 'foo.baz')).toBe(null);
});

test ('Separator in the key name', () => {
	expect(get({foo: {['baz.bar']: {zomg: 'woh'}}}, 'foo.baz.bar.zomg')).toBe('woh');
	expect(get({foo: {['.baz.bar.']: {zomg: 'woh'}}}, 'foo..baz.bar..zomg')).toBe('woh');
	expect(get({foo: {['baz.bar']: {zomg: 'woh'}}}, '.foo.baz.bar.zomg')).toBe(undefined);
	expect(get({foo: {['baz.bar']: {zomg: 'woh'}}}, 'foo.baz.bar.zomg.')).toBe(undefined);
});

test ('Alt Separator', () => {
	expect(get({foo: {['baz.bar']: {zomg: 'woh'}}}, {path: 'foo/baz.bar/zomg', sep: '/'})).toBe('woh');
	expect(get({foo: {['baz.bar']: {zomg: 'woh'}}}, {path: 'foo/baz.b/zomg', sep: '/'})).toBe(undefined);
	expect(get({foo: {['baz.bar']: null}}, {path: 'foo/baz.bar/zomg', sep: '/'})).toBe(null);
});
