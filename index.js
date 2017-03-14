'use strict';
const Model = require('./Model');
const User = require('./User');

const author = new User({username: 'guest', isAdmin: false});

console.log(`"${author.username}" can add page? ${author.canAddPage}`);
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