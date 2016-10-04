import wait from '../index';

describe('wait', () => {
	beforeEach(() => {
		jasmine.clock().install();
	});

	afterEach(() => {
		jasmine.clock().uninstall();
	});


	it('Returns a promise', () => {
		expect(wait() instanceof Promise).toBeTruthy();
	});

	it('Fulfills on timeout', (done) => {
		jasmine.clock().mockDate();
		const time = Date.now();
		const waitTime = 100;
		const o = {spy () {}};

		spyOn(o, 'spy').and.callFake(() => {
			const dur = Date.now() - time;
			expect(dur >= waitTime).toBeTruthy();
		});

		wait(waitTime)
			.then(o.spy)
			.then(done, done.fail);

		expect(o.spy).not.toHaveBeenCalled();

		jasmine.clock().tick(waitTime);
	});
});
