const tap = require('tap');
const Model = require('../index').Model;

// Quick-use
const page = new Model({title: 'Home page', slug: '/'});
tap.equal(page.get('title'), 'Home page', 'Init properties can be defined');
tap.equal(page.title, 'Home page', 'Init properties can be retrieved with shorthand');

const aboutPage = page.clone();
tap.equal(aboutPage.title, 'Home page', 'Cloned properties should carry through');
aboutPage.set('title', 'About');
tap.equal(aboutPage.title, 'About', 'Cloned objects should allow setting');
tap.equal(page.title, 'Home page', 'Cloned objects should not update original object');
