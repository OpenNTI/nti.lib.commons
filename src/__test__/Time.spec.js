/* eslint-env jest */
import {MockDate} from '../date';
import Time from '../Time';

describe('Time', () => {
	beforeEach (() => {
		jest.useFakeTimers();
	});

	afterEach (() => {
		MockDate.uninstall();
		jest.useRealTimers();
	});

	test ('Time intializes with current time by default', () => {
		MockDate.install();//lock the clock so we don't get millisecond differences
		const time = new Time();
		const date = new Date();
		expect(time.getHours()).toEqual(date.getHours());
		expect(time.getMinutes()).toEqual(date.getMinutes());
		expect(time.date.getTime()).toEqual(date.getTime());
	});

	test ('Time intializes with given date`s time', () => {
		const date = new Date();
		date.setHours(168);

		const time = new Time(date);
		expect(time.getHours()).toEqual(date.getHours());
		expect(time.getMinutes()).toEqual(date.getMinutes());
		expect(time.date.getTime()).toEqual(date.getTime());
	});

	test ('Hours Setter do not mutate and set correct time', () => {
		MockDate.install(new Date('2017-08-18T16:30:00Z'));//lock the date for the test
		const time = new Time();
		const testTime = new Date();

		testTime.setHours(1);
		const newTime = time.setHours(1);

		// Check immutablity
		expect(newTime.getHours()).not.toEqual(time.getHours());
		// Check correctly changing
		expect(newTime.getHours()).toEqual(testTime.getHours());
	});

	test ('Minutes Setter do not mutate and set correct time', () => {
		MockDate.install(new Date('2017-08-18T16:30:00Z'));//lock the date for the test
		const time = new Time();
		const testTime = new Date();

		testTime.setMinutes(1);
		const newTime = time.setMinutes(1);

		// Check immutablity
		expect(newTime.getMinutes()).not.toEqual(time.getMinutes());
		// Check correctly changing
		expect(newTime.getMinutes()).toEqual(testTime.getMinutes());
	});

	test ('GetHours always in 24-hours', () => {
		const date = new Date();
		date.setHours(13);
		const time = new Time(date);

		expect(time.getHours()).toEqual(date.getHours());
	});

	test ('GetMinutes', () => {
		const date = new Date();
		date.setMinutes(30);
		const time = new Time(date);

		expect(time.getHours()).toEqual(date.getHours());
	});

	test ('SetPeriod correctly converts AM => PM', () => {
		// Setup up day that is set at 2 AM
		const date = new Date();
		date.setHours(2);
		date.setMinutes(0);
		const time = new Time(date);
		// Switch time to 2 PM
		const newTime = time.setPeriod('PM');
		expect(newTime.getHours()).toEqual(14);
	});

	test ('SetPeriod correctly converts PM => AM', () => {
		const date = new Date();
		date.setHours(14);
		date.setMinutes(0);
		const time = new Time(date);
		const newTime = time.setPeriod('AM');
		expect(newTime.getHours()).toEqual(2);
	});

	test ('incrementHours rolls', () => {
		const date = new Date();
		date.setHours(23);
		const time = new Time(date);

		const newTime = time.incrementHours();
		expect(newTime.getHours()).toEqual(0);
	});
	test ('incrementMinutes rolls', () => {
		const date = new Date();
		date.setMinutes(59);
		const time = new Time(date);

		const newTime = time.incrementMinutes();
		expect(newTime.getMinutes()).toEqual(0);
	});

	test ('decrementHours rolls', () => {
		const date = new Date();
		date.setHours(0);
		const time = new Time(date);

		const newTime = time.decrementHours();
		expect(newTime.getHours()).toEqual(23);
	});

	test ('decrementMinutes rolls', () => {
		const date = new Date();
		date.setMinutes(0);
		const time = new Time(date);

		const newTime = time.decrementMinutes();
		expect(newTime.getMinutes()).toEqual(59);
	});
});
