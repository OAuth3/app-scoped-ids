'use strict';

var scoper = require('./');
            // require('crypto').randomBytes(16).toString('hex');
var appSecret = new Buffer('84b1a5bf7583767508005345381507c1', 'hex');

var id = 'some-reliably-unique-id';
var appScopedId = scoper.scope(id, appSecret);
var id2 = scoper.unscope(appScopedId, appSecret);

console.log('original id:', id);
console.log('app-scoped: ', appScopedId);
console.log('and back:   ', id2);

if (id !== id2) {
  throw new Error("test failed!");
}
