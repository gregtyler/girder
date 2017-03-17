'use strict';
class SchemaField {
  constructor(fieldName, definition) {
    this.name = fieldName;

    this.isRequired = false;
    this.defaultValue = null;

    if (typeof definition === 'object') {
      if (typeof definition.isRequired !== 'undefined') this.isRequired = definition.isRequired;
      if (typeof definition.defaultValue !== 'undefined') this.defaultValue = definition.defaultValue;
      this.type = definition.type;
    } else {
      this.type = definition;
    }
  }
}

class Model {
  constructor(data) {
    this._properties = {};
    this._events = {};

    // Initialise the schema
    if (this.getSchema && this.getSchema()) {
      this.initSchema(this.getSchema());
    }

    // Set initial data
    this.set(data);

    // Check required values were set
    if (this._schema) {
      const _this = this;
      this._schema.forEach(function(field) {
        if (field.isRequired && _this[field.name] === null) {
          throw new Error(`The field "${field.name}" is required but has not been specified`);
        }
      });
    }

    return this;
  }

  on(eventName, callback) {
    if (typeof this._events[eventName] !== 'object') this._events[eventName] = [];
    this._events[eventName].push(callback);
  }

  emit(eventName) {
    if (this._events[eventName]) {
      const args = Array.prototype.slice.apply(arguments).slice(1);

      for (let event of this._events[eventName]) {
        event.apply(this, args);
      }
    }
  }

  set(name, value) {
    // If a dictionary was provided, do each update separate
    if (typeof name === 'object') {
      for (let singleName in name) {
        this.set(singleName, name[singleName]);
      }
      return this;
    }

    // Validate the field
    if (this._schema) {
      const field = this._schema.find(field => field.name === name);
      if (field && value !== null && value.constructor !== field.type) {
        throw new Error(`${name} should be ${field.type.name}, not ${value.constructor.name}`);
      }
    }

    // Emit event noting was has changed
    this.emit('change', {field: name, oldValue: this._properties[name], newValue: value});

    // Update the underlying object
    this._properties[name] = value;

    return this;
  }

  get(name) {
    return this._properties[name];
  }

  initSchema(schema) {
    this._schema = [];
    for (const name in schema) {
      const field = new SchemaField(name, schema[name]);
      this._schema.push(field);

      // Set default values
      this.set(name, field.defaultValue);

      // Define the property
      Object.defineProperty(this, name, {get: this.get.bind(this, name)});
    }

    return this;
  }

  // validate()
  // undo()?

  toJSON() {
    const prototype = Object.getPrototypeOf(this);
    const properties = this._properties;
    const _this = this;

    // Add calculated properties
    Object.entries(Object.getOwnPropertyDescriptors(prototype))
      .filter(([, descriptor]) => typeof descriptor.get === 'function')
      .forEach(([key]) => {properties[key] = _this[key];});

    // Stringify the result
    return JSON.stringify(properties);
  }
}

module.exports = Model;
