'use strict';
const tap = require('tap');
const Model = require('../index');
const User = require('../examples/User');

const author = new User({username: 'guest', isAdmin: false});

tap.type(author.username, 'string', 'Init type is set correctly');
tap.equal(author.username, 'guest', 'Init value is set correctly');
tap.type(author.canAddPage, 'boolean', 'Default type is set correctly');
tap.equal(author.canAddPage, false, 'Default value is set correctly');
console.log(author.url);
console.log(author.toJSON());

author.on('change', (changes) => {console.log(`${changes[0].field} was changed from ${changes[0].oldValue} to ${changes[0].newValue}`);});

author
  .set('canAddPage', true)
  .set('lastLoggedIn', new Date());

try {
  author.set({canAddPage: 'invalid value'});
} catch (e) {
  console.log('TypeError correctly caught');
}

console.log(author.toJSON());

// Quick-use
class Page extends Model {}
const page = new Page({title: 'Home page', slug: '/'});
console.log(page.get('title'));
