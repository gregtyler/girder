'use strict';
const Model = require('../index').Model;

class User extends Model {
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
