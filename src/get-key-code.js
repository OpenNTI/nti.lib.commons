/**
 * Given an object (React Event-like) produce a key-command sequence identifier.
 *
 * @param  {objcet} e The event/event-like object to derive the key command from.
 * @param  {boolean} e.altKey - a flag that states if the alt key is active.
 * @param  {boolean} e.ctrlKey - a flag that states if the control key is active.
 * @param  {string} e.key - A string representation of they key. eg: 'S'
 * @param  {boolean} e.metaKey - a flag that states if the meta/super/command key is active.
 * @param  {boolean} e.shiftKey - a flag that states if the shift key is active.
 * @return {string|null} Returns the key-command or null if the object did not represent keys.
 */
export default function getKeyCode (e) {
	const modifiers = ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
	const code = ['nti'];

	for (let mod of modifiers) {
		if (e[mod]) {
			code.push(mod.replace(/Key$/, ''));
		}
	}

	if (e.key) {
		code.push(e.key.toLowerCase());
	}

	return code.length > 1 ? code.join('-') : null;
}

//Define some common key combos
getKeyCode.SHIFT_TAB = getKeyCode({shiftKey: true, key: 'Tab'});
getKeyCode.TAB = getKeyCode({key: 'Tab'});

getKeyCode.ENTER = getKeyCode({key: 'Enter'});

getKeyCode.BACKSPACE = getKeyCode({key: 'Backspace'});
getKeyCode.DELETE = getKeyCode({key: 'Delete'});
