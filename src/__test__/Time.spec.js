import Time from '../Time';

describe('Time', () => {
	beforeEach(() => {
		jasmine.clock().install();
	});

	afterEach(() => {
		jasmine.clock().uninstall();
	});

	it('Time intializes with current time by default', () => {
		jasmine.clock().mockDate();//lock the clock so we don't get millisecond differences
		const time = new Time();
		const date = new Date();
		expect(time.getHours()).toEqual(date.getHours());
		expect(time.getMinutes()).toEqual(date.getMinutes());
		expect(time.date.getTime()).toEqual(date.getTime());
	});

	it('Time intializes with given date`s time', () => {
		const date = new Date();
		date.setHours(168);

		const time = new Time(date);
		expect(time.getHours()).toEqual(date.getHours());
		expect(time.getMinutes()).toEqual(date.getMinutes());
		expect(time.date.getTime()).toEqual(date.getTime());
	});

	it('Hours Setter do not mutate and set correct time', () => {
		const time = new Time();
		const testTime = new Date();

		testTime.setHours(1);
		const newTime = time.setHours(1);

		// Check immutablity
		expect(newTime.getHours()).not.toEqual(time.getHours());
		// Check correctly changing
		expect(newTime.getHours()).toEqual(testTime.getHours());
	});

	it('Minutes Setter do not mutate and set correct time', () => {
		const time = new Time();
		const testTime = new Date();

		testTime.setMinutes(1);
		const newTime = time.setMinutes(1);

		// Check immutablity
		expect(newTime.getMinutes()).not.toEqual(time.getMinutes());
		// Check correctly changing
		expect(newTime.getMinutes()).toEqual(testTime.getMinutes());
	});

	it('GetHours always in 24-hours', () => {
		const date = new Date();
		date.setHours(13);
		const time = new Time(date);

		expect(time.getHours()).toEqual(date.getHours());
	});

	it('GetMinutes', () => {
		const date = new Date();
		date.setMinutes(30);
		const time = new Time(date);

		expect(time.getHours()).toEqual(date.getHours());
	});

	it('SetPeriod correctly converts AM => PM', () => {
		// Setup up day that is set at 2 AM
		const date = new Date();
		date.setHours(2);
		date.setMinutes(0);
		const time = new Time(date);
		// Switch time to 2 PM
		const newTime = time.setPeriod('PM');
		expect(newTime.getHours()).toEqual(14);
	});

	it('SetPeriod correctly converts PM => AM', () => {
		const date = new Date();
		date.setHours(14);
		date.setMinutes(0);
		const time = new Time(date);
		const newTime = time.setPeriod('AM');
		expect(newTime.getHours()).toEqual(2);
	});

	it('incrementHours rolls', () => {
		const date = new Date();
		date.setHours(23);
		const time = new Time(date);

		const newTime = time.incrementHours();
		expect(newTime.getHours()).toEqual(0);
	});
	it('incrementMinutes rolls', () => {
		const date = new Date();
		date.setMinutes(59);
		const time = new Time(date);

		const newTime = time.incrementMinutes();
		expect(newTime.getMinutes()).toEqual(0);
	});

	it('decrementHours rolls', () => {
		const date = new Date();
		date.setHours(0);
		const time = new Time(date);

		const newTime = time.decrementHours();
		expect(newTime.getHours()).toEqual(23);
	});

	it('decrementMinutes rolls', () => {
		const date = new Date();
		date.setMinutes(0);
		const time = new Time(date);

		const newTime = time.decrementMinutes();
		expect(newTime.getMinutes()).toEqual(59);
	});
});
