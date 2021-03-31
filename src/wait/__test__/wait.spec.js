/* globals spyOn */
/* eslint-env jest */
import { wait } from '../wait.js';
import { MockDate } from '../../date/MockDate.js';

describe('wait', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		MockDate.uninstall();
		jest.useRealTimers();
	});

	test('Returns a promise', () => {
		expect(wait() instanceof Promise).toBeTruthy();
	});

	test('Fulfills on timeout', done => {
		MockDate.install();
		const time = Date.now();
		const waitTime = 100;
		const o = { spy() {} };

		spyOn(o, 'spy').and.callFake(() => {
			const dur = Date.now() - time;
			expect(dur >= waitTime).toBeTruthy();
		});

		wait(waitTime).then(o.spy).then(done, done.fail);

		expect(o.spy).not.toHaveBeenCalled();

		MockDate.install(time + waitTime);
		jest.runTimersToTime(waitTime);
	});
});
