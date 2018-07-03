let supported = null;

export default function supportsPassive () {

	if (supported == null) {
		try {
			global.addEventListener('test', null, { get passive () { return supported = true; } });
		} catch(e) {/**/}
	}

	return supported;
}
