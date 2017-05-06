# Girders
[![Build Status](https://travis-ci.org/gregtyler/girders.svg?branch=master)](https://travis-ci.org/gregtyler/girders?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/gregtyler/girder/badge.svg?branch=master)](https://coveralls.io/github/gregtyler/girder?branch=master)

A one-stop JavaScript shop for models. Define once, use on both client and server side, with (still to be developed!) easy integration with IndexedDB, GraphQL and REST endpoints.

Written in the latest ECMAScript for maximum readability and simplicity of use.

## Quick example
```javascript
const Girders = require('girders');

class Car extends Girders {
  getSchema() {
    return {
      id: Integer,
      name: {type: String, isRequired: true},
      doors: Integer
    };
  }

  get url() {
    return `https://example.com/car/${this.username}`;
  }
}

const peugeot309 = new Car({name: 'Peugeot 309', doors: 5});

console.log(`<a href="${peugeot309.url}">${peugeot309.name}</a> has ${peugeot309.doors}`);
```
