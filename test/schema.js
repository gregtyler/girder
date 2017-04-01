'use strict';
const tap = require('tap');
const Model = require('../index').Model;
const User = require('../examples/User');

const author = new User({username: 'guest', isAdmin: false});

// Initial setup
tap.type(author.username, 'string', 'Init property type is set correctly');
tap.equal(author.username, 'guest', 'Init property value is set correctly');
tap.type(author.canAddPage, 'boolean', 'Default property type is set correctly');
tap.equal(author.canAddPage, false, 'Default property value is set correctly');

tap.equal(author.url, 'https://example.com/author/guest', 'Calculated properties are retrieved correctly');

tap.strictSame(JSON.parse(author.toJSON()), {
  username: "guest",
  isAdmin: false,
  canAddPage: false,
  url: 'https://example.com/author/guest'
}, 'JSON generation includes default, init and calculated properties');

// Setting properties
const loginDate = new Date();
author
  .set('canAddPage', true)
  .set('isAdmin', true)
  .set('lastLoggedIn', loginDate);

tap.equal(author.canAddPage, true, 'Default properties are overwritten when set');
tap.equal(author.isAdmin, true, 'Init properties are overwritten when set');
tap.equal(author.lastLoggedIn, loginDate, 'New properties can be defined');
tap.equal(new Date(JSON.parse(author.toJSON()).lastLoggedIn).getTime(), loginDate.getTime(), 'New properties are included in JSON');

// Change events
tap.test('change events', function() {
  return new Promise(function(resolve, reject) {
    author.on('change', (change) => {
      tap.equal(change.field, 'displayName');
      tap.equal(change.oldValue, undefined);
      tap.equal(change.newValue, 'Guest');
      tap.end();
      resolve();
    });

    author.set('displayName', 'Guest');
  });
});

// Validation
tap.throws(function() {
  const badUser = new User({});
}, {}, 'Error thrown if trying to not setting required properties');

tap.throws(function() {
  author.set({canAddPage: 'invalid value'});
}, {}, 'Error thrown if trying to use wrong type');
