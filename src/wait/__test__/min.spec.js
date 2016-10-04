import waitMin from '../min';

describe('wait-min', () => {
	beforeEach(() => {
		jasmine.clock().install();
	});

	afterEach(() => {
		jasmine.clock().uninstall();
	});


	it('Fulfills before min wait time, waits at least the min wait time and then resolves with result', (done) => {
		jasmine.clock().mockDate();
		const start = Date.now();
		const time = 500;
		const value = 'foobar';

		const o = {spy () {}};

		spyOn(o, 'spy').and.callFake(result => {
			const diff = Date.now() - start;
			expect(diff >= time).toBeTruthy();
			expect(result).toBe(value);
		});

		Promise.resolve(value)
			.then(waitMin(time))
			.then(o.spy)
			.then(done, done.fail);

		expect(o.spy).not.toHaveBeenCalled();

		jasmine.clock().tick(time);
	});


	it('Fulfills after min wait time, resolves with result', (done) => {
		jasmine.clock().mockDate();
		const start = Date.now();
		const time = 500;
		const value = 'foobar2';
		let gap;

		const o = {spy1 () {}, spy2 () {}};

		spyOn(o, 'spy1').and.callFake(result => {
			gap = Date.now();
			const diff = gap - start;
			expect(o.spy2).not.toHaveBeenCalled();
			expect(diff >= time).toBeTruthy();
			expect(result).toBe(value);
			jasmine.clock().tick(1);
			return result;
		});

		spyOn(o, 'spy2').and.callFake(result => {
			const now = Date.now();
			const diff = now - start;
			expect((gap - now) < (time / 2)).toBeTruthy();
			expect(diff >= time).toBeTruthy();
			expect(result).toBe(value);
		});

		new Promise((resume) => setTimeout(()=> resume(value), time))
			.then(o.spy1)
			.then(waitMin(time / 2)) //make original promise take longer than min-wait.
			.then(o.spy2)
			.then(done, done.fail);

		expect(o.spy1).not.toHaveBeenCalled();
		expect(o.spy2).not.toHaveBeenCalled();

		jasmine.clock().tick(time);
	});
});
