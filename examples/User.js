'use strict';
const Model = require('../index');

class User extends Model {
  getTable() {
    return 'user';
  }

  getSchema() {
    return {
      username: {type: String, isRequired: true},
      isAdmin: Boolean,
      canAddPage: {type: Boolean, defaultValue: false}
    };
  }

  get url() {
    return `https://example.com/author/${this.username}`;
  }
}

module.exports = User;
