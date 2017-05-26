const GlobalDate = global.Date;

export default class MockDate extends Date {

	static install (now = GlobalDate.now()) {
		this.time = (now instanceof GlobalDate ? now.getTime() : now);
		global.Date = MockDate;
	}

	static uninstall () {
		this.time = 0;
		global.Date = GlobalDate;
	}

	static now () {
		return this.time;
	}

	constructor (...args) {
		super(...(args.length ? args : [MockDate.time]));
	}
}
