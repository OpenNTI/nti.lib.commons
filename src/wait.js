export default function wait (milliseconds) {
	return new Promise(resume => setTimeout(()=>resume(), milliseconds));
}

export const SHORT = 300;
export const LONG = 5000;
