/* eslint-env browser */
import { supportsPassive } from '../events/supports-passive.js';

const ACTIVE = 'active';
const IDLE = 'idle';

const DEFAULTS = {
	//start as soon as timer is set up
	start: true,
	// timer is enabled
	enabled: true,
	// amount of time before timer fires
	timeout: 30000,
	// what element to attach to
	element: null,
	// activity is one of these events
	events:
		'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove',
};

const Schedule = Symbol('state:schedule');
const ToggleState = Symbol('state:toggle');

export class Idle {
	constructor(opt) {
		let op = (this.opt = { ...DEFAULTS, ...opt });
		this.element =
			op.element || (typeof document !== 'undefined' ? document : void 0);

		this.state = {
			idle: op.idle,
			timeout: op.timeout,
			enabled: op.enabled,
			idleFn: [],
			activeFn: [],
		};

		if (op.start) {
			this.start();
		}
	}

	/**
	 * Start the idle timer.
	 *
	 * @returns {void}
	 */
	start() {
		const { state, element, opt } = this;

		const handler = () => {
			clearTimeout(state.timerId);

			if (!state.enabled) {
				return;
			}

			if (state.idle) {
				this[ToggleState](state);
			}

			state.timerId = this[Schedule]();
		};

		if (state.handler) {
			return;
		}

		state.handler = handler;

		if (element) {
			opt.events.split(' ').forEach(evt => on(element, evt, handler));
		}
		state.timerId = this[Schedule]();
	}

	/**
	 * Stop the idle timer.
	 *
	 * @returns {void}
	 */
	stop() {
		const { state, element, opt } = this;

		state.enabled = false;

		//clear any pending timeouts
		clearTimeout(state.timerId);

		opt.events.split(' ').forEach(evt => un(element, evt, state.handler));

		delete state.handler;
	}

	on(state, fn) {
		const { idleFn, activeFn } = this.state;
		const list = state === IDLE ? idleFn : activeFn;
		list.push(fn);
	}

	getElapsed() {
		return +new Date() - this.state.olddate;
	}

	[Schedule]() {
		return setTimeout(() => this[ToggleState](), this.state.timeout);
	}

	[ToggleState]() {
		const { state } = this;
		state.idle = !state.idle;

		const now = Date.now();
		const elapsed = now - state.olddate;
		state.olddate = now;

		// handle js alert or comfirm popup
		if (state.idle && elapsed < state.timeout) {
			state.idle = false;
			clearTimeout(state.timerId);
			if (state.enabled) {
				state.timerId = this[Schedule]();
			}
			return;
		}

		const evt = state.idle ? IDLE : ACTIVE;
		const fns = evt === IDLE ? state.idleFn : state.activeFn;
		for (let fn of fns) {
			fn();
		}
	}
}

function on(element, event, fn) {
	try {
		const options = supportsPassive() ? { passive: true } : false;
		element.addEventListener(event, fn, options);
	} catch (e) {
		if (element && element.attachEvent) {
			element.attachEvent('on' + event, fn);
		}
	}
}

function un(element, event, fn) {
	try {
		const options = supportsPassive() ? { passive: true } : false;
		element.removeEventListener(event, fn, options);
	} catch (e) {
		if (element && element.detachEvent) {
			element.detachEvent('on' + event, fn);
		}
	}
}
