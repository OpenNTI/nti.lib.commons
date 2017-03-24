import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
	entry: 'src/index.js',
	format: 'cjs',
	dest: 'lib/index.js',
	sourceMap: true,
	exports: 'named',
	external: [
		'events',
		'isempty',
		'media-typer',
		'nti-lib-ntiids',
		'nti-util-logger',
		'path',
		'url',
		'uuid/v4'
	],
	plugins: [
		babel({ exclude: 'node_modules/**' }),
		commonjs({
			ignoreGlobal: true
		}),
		json()
	]
};
