import { on } from './on.js';
import { min } from './min.js';
export const SHORT = 300;
export const LONG = 5000;

export function wait(milliseconds) {
	return new Promise(resume => setTimeout(() => resume(), milliseconds || 0));
}

Object.assign(wait, { on, min, SHORT, LONG });
