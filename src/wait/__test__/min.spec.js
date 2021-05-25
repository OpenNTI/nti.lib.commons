/* eslint-env jest */
import { min as waitMin } from '../min.js';
import { MockDate } from '../../date/MockDate.js';

describe('wait-min', () => {
	afterEach(() => {
		MockDate.uninstall();
		jest.useRealTimers();
	});

	test('Fulfills before min wait time, waits at least the min wait time and then resolves with result', done => {
		jest.useFakeTimers();
		MockDate.install();
		const start = Date.now();
		const time = 500;
		const value = 'foobar';

		const o = { spy() {} };

		jest.spyOn(o, 'spy').mockImplementation(result => {
			const diff = Date.now() - start;
			expect(diff >= time).toBeTruthy();
			expect(result).toBe(value);
		});

		Promise.resolve(value)
			.then(waitMin(time))
			.then(o.spy)
			.then(done, done.fail);

		expect(o.spy).not.toHaveBeenCalled();

		MockDate.uninstall();
		MockDate.install(start + time);
		jest.advanceTimersByTime(time);
	});

	test('Fulfills after min wait time, resolves with result', done => {
		MockDate.install();
		const start = Date.now();
		const time = 500;
		const value = 'foobar2';
		let gap;

		const o = { spy1() {}, spy2() {} };

		jest.spyOn(o, 'spy1').mockImplementation(result => {
			gap = Date.now();
			const diff = gap - start;
			expect(o.spy2).not.toHaveBeenCalled();
			expect(diff >= time).toBeTruthy();
			expect(result).toBe(value);
			MockDate.install(gap + 1);
			jest.advanceTimersByTime(1);
			return result;
		});

		jest.spyOn(o, 'spy2').mockImplementation(result => {
			const now = Date.now();
			const diff = now - start;
			expect(gap - now < time / 2).toBeTruthy();
			expect(diff >= time).toBeTruthy();
			expect(result).toBe(value);
		});

		new Promise(resume => setTimeout(() => resume(value), time))
			.then(o.spy1)
			.then(waitMin(time / 2)) //make original promise take longer than min-wait.
			.then(o.spy2)
			.then(done, done.fail);

		expect(o.spy1).not.toHaveBeenCalled();
		expect(o.spy2).not.toHaveBeenCalled();

		MockDate.install(start + time);
		jest.advanceTimersByTime(time);
	});
});
