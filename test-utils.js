/* global jest */
export const flushPromises = (() => {
	const run = process.nextTick;
	return () =>
		new Promise(resolve => {
			jest.runAllTimers();

			run.call(process, resolve);
		});
})();
