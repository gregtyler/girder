/* globals module */
module.exports = class Eventable {
  constructor() {
    this._events = {};
  }

  emit(eventName) {
    if (typeof this._events[eventName] === 'undefined') return false;

    const args = Array.prototype.slice.apply(arguments).slice(1);

    for (let event of this._events[eventName]) {
      event.apply(this, args);
    }
  }

  on(eventName, callback) {
    if (typeof this._events[eventName] !== 'object') this._events[eventName] = [];

    this._events[eventName].push(callback);

    return this;
  }
};
