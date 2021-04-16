export function chain(original, toChain) {
	return !original
		? toChain
		: Object.assign(
				function () {
					let r = original.apply(this, arguments);
					toChain.apply(this, arguments);
					return r;
				},
				{ chained: true }
		  );
}
