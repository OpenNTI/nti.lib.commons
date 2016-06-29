/**
 * Returns true if the function is in a cooloff period, and starts/restarts the cooloff period.
 *
 * Exampple:
 *
 * import isCoolingOff from 'nti-commons/lib/function-cooloff';
 *
 * function doSomething (...) {
 *     if (isCoolingOff(doSomething)) {return;}
 *
 *     //do your work here
 * }
 *
 *
 * @param  {Function} fn   The function to cooloff.
 * @param  {number}   [time=1000] - The time to cool off, in milliseconds
 * @param  {string}   [key='cooloff']  - A key to store the cooldown timer id.
 * @returns {boolean} true if the cool down period is still on, false if function is clear to call again.
 */
export default function cooloff (fn, time = 1000, key = 'cooloff') {
	const currentCooloff = fn[key];
	clearTimeout(currentCooloff);
	fn[key] = setTimeout(() => delete fn[key], time);
	return !!currentCooloff;
}
