import { _for } from './for.js';
import { on } from './on.js';
import { min } from './min.js';
import { wait, SHORT, LONG } from './wait.js';

const waitFn = (...args) => wait(...args);
waitFn.for = _for;
waitFn.on = on;
waitFn.min = min;

export { waitFn as wait, SHORT, LONG };
