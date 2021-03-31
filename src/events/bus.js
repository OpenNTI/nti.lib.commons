import EventEmitter from 'events';

export const Bus = new EventEmitter();
Bus.setMaxListeners(0);
