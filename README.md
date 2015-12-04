app-scoped-ids
=========

Create deterministic and cryptographically secure App-Scoped IDs by applying AES encryption and a previously generated App Secret.

It is important to note that the IV (initialization vector) is set to null (all 0s) because we explicitly want deterministic values
(and we wouldn't want to waste space for attaching the iv anyway).

```bash
npm install --save app-scoped-ids
```

```javascript
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
```

License
=======

(MIT OR Apache-2.0)

See LICENSE
