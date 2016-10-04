import EventEmitter from 'events';

export default class Executor extends EventEmitter {

	constructor (maxConcurrency = 1) {
		super();
		Object.defineProperties(this, {
			maxConcurrency: {value: maxConcurrency},
			current: {value: []},
			queue: {value: []}
		});
	}

	/**
	 * Add a single task to the queue.
	 *
	 * @param  {function} task a single function that returns a Promise
	 * @return {Promise}      the fulfillment of the functions return
	 */
	queueTask (task) {
		return this.queueTasks(task)[0];
	}


	/**
	 * Adds tasks to the queue for execution.
	 *
	 * @param  {...function} tasks - Each argument of this method should be a function that returns a Promise.
	 * @return {Promise[]} The promise of each argument.
	 * @public
	 */
	queueTasks (...tasks) {
		const {queue} = this;
		for (let task of tasks) {
			if (!queue.includes(task)) {

				task.promise = new Promise((x, y) => {task.resolve = x; task.reject = y;});
				if (!task.resolve || !task.reject) {
					throw new Error('Promise execution error. Bad polyfill?');
				}

				queue.push(task);
			}
		}

		this.schedual();

		return tasks.map(x => x.promise);
	}


	/**
	 * Responsible for moving the tasks forward.
	 *
	 * @private
	 * @return {void}
	 */
	schedual = () => {
		const {queue, current, maxConcurrency: max} = this;
		const remove = f => (f = current.indexOf(f), f >= 0 && current.splice(f, 1));
		const run = f => Promise.resolve().then(f)
							//these catch and consume any exception/rejection.
							//Also, the resolve our .promise. (let callers know)
							.then(f.resolve, f.reject)
							//Always remove ourselves from the current.
							.then(() => remove(f))
							//always run schedual.
							.then(this.schedual, this.schedual);

		if (current.length < max) {

			//pull the next items out of the queue (from the front)
			const next = queue.splice(0, max - current.length);
			current.push(...next); //add them to the current.
			//run them.
			next.map(run);
		}
	}
}
