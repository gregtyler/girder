'use strict';
const Model = require('./Model');

class User extends Model {
  getTable() {
    return 'user';
  }

  getSchema() {
    return {
      username: String,
      isAdmin: Boolean,
      canAddPage: {type: Boolean, defaultValue: false}
    };
  }

  get url() {
    return `https://example.com/author/${this.username}`;
  }
}

module.exports = User;