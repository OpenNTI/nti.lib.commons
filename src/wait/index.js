import on from './on';
import min from './min';

export default function wait(milliseconds) {
	return new Promise(resume => setTimeout(() => resume(), milliseconds || 0));
}

export const SHORT = 300;
export const LONG = 5000;

Object.assign(wait, { on, min, SHORT, LONG });
