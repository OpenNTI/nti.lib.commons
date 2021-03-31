export const PERIOD = Object.freeze({
	AM: 'AM',
	PM: 'PM',
});

export class Time {
	constructor(date = new Date()) {
		Object.defineProperty(this, 'date', {
			configurable: false,
			enumerable: false,
			writable: false,
			value: Object.freeze(new Date(date)),
		});

		return Object.freeze(this);
	}

	applyTime(date) {
		const hours = this.getHours();
		const minutes = this.getMinutes();
		date = new Date(date);
		date.setHours(hours, minutes, 0, 0);
		return date;
	}

	getHours() {
		return this.date.getHours();
	}

	setHours(hours) {
		const d = new Date(this.date);
		d.setHours(hours);
		return new Time(d);
	}

	getMinutes() {
		return this.date.getMinutes();
	}

	setMinutes(minutes) {
		const d = new Date(this.date);
		d.setMinutes(minutes);
		return new Time(d);
	}

	getPeriod() {
		return this.getHours() < 12 ? PERIOD.AM : PERIOD.PM;
	}

	setPeriod(period) {
		if (!Object.values(PERIOD).includes(period)) {
			throw new Error('Must supply a period.');
		}

		const old = this.getPeriod();
		let hours = this.getHours();

		if (old === PERIOD.AM && period === PERIOD.PM) {
			hours += 12;
		} else if (old === PERIOD.PM && period === PERIOD.AM) {
			hours -= 12;
		} else {
			return this;
		}

		const d = new Date(this.date);
		d.setHours(hours);
		return new Time(d);
	}

	/////////////////

	incrementHours() {
		const d = new Date(this.date);
		d.setHours(d.getHours() + 1);
		return new Time(d);
	}

	decrementHours() {
		const d = new Date(this.date);
		d.setHours(d.getHours() - 1);
		return new Time(d);
	}

	incrementMinutes() {
		const d = new Date(this.date);
		d.setMinutes(d.getMinutes() + 1);
		return new Time(d);
	}

	decrementMinutes() {
		const d = new Date(this.date);
		d.setMinutes(d.getMinutes() - 1);
		return new Time(d);
	}
}
