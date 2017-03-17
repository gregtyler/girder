const tap = require('tap');
const Model = require('../index');

// Quick-use
const page = new Model({title: 'Home page', slug: '/'});
tap.equal(page.get('title'), 'Home page', 'Init properties can be defined');
tap.equal(page.title, 'Home page', 'Init properties can be retrieved with shorthand');
