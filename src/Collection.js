'use strict';
const Model = require('./Model.js');

class Collection {
  constructor() {
    this._models = [];
    this.table;
    this.key = '_id';
  }

  seed(item) {
    if (Array.isArray(item)) {
      return item.map(this.seed.bind(this));
    }

    // See if the model already exists
    const findModel = this.find(item);
    if (findModel) {
      return findModel;
    }

    // Build the new model
    const newModel = item.constructor.name === 'Object' ? Object.assign({}, item) : item;
    this._models.push(newModel);
    return newModel;
  }

  find(criteria) {
    const all = this.all(criteria);

    if (typeof all === 'object' && all.length > 0) {
      return all[0];
    } else {
      return null;
    }
  }

  all(criteria) {
    if (criteria && typeof criteria === 'function') {
      return this._models.filter(criteria);
    } else if (criteria) {
      return this._models.filter(function(item) {
        for (let key in criteria) {
          if (typeof criteria[key] === 'function') {
            if (!criteria[key].call(item, item[key])) {
              return false;
            }
          } else {
            let object = item;
            let index = 0;
            const path = key.split('.');
            while (object !== null && index < path.length) object = object[path[index++]];

            if (object !== criteria[key]) {
              return false;
            }
          }
        }

        return true;
      });
    } else {
      return this._models.slice();
    }
  }

  toJSON() {
    return '[' + this._models.map(function(model) {
      if (model instanceof Model) {
        return model.toJSON()
      } else {
        return JSON.stringify(model);
      }
    }).join(',') + ']';
  }
}

module.exports = Collection;
