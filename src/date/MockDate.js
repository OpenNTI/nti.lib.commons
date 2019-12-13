const GlobalDate = global.Date;

export default class MockDate extends Date {
	static OriginalDate = GlobalDate;

	static get time () {
		return this.mockNow ? this.mockNow.getTime() : GlobalDate.now();
	}

	static install (now = GlobalDate.now()) {
		this.mockNow = new GlobalDate(now);
		global.Date = MockDate;
	}

	static uninstall () {
		this.mockNow = null;
		global.Date = GlobalDate;
	}

	static now () {
		return this.time;
	}

	static setNow (now) {
		this.mockNow = new GlobalDate(now);
	}

	static setDestination (dest) {
		return {
			hit88MPH: () => {
				console.log('🚗🔥🔥🔥🔥🔥🔥🔥');//eslint-disable-line
				this.mockNow = new GlobalDate(dest || 'November 5, 1955');
			},

			illBeBack: () => {
				console.log('⚡🔮⚡');//eslint-disable-line
				this.mockNow = new GlobalDate(dest || 'October 26,1984');
			}
		};
	}

	constructor (...args) {
		super();

		if (args.length === 0) {
			return new GlobalDate(MockDate.time);
		} else {
			return new GlobalDate(...args);
		}

	}
}
