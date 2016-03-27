# go
 MutiThread function `go`, just like in golang!

# Usage
```js
const go = require('go');
let res = go([1, 2], arrs => arrs.map(d => ++d));
```

The function passed to `go` will be executed in a independent isolation，which means it's scope is different from normal function.parameter passing is the only way to communicate with the thread.

# test

```
fibjs test/index.test.js
```

# Attendtion
- You can only use this lib on [fibjs](https://github.com/xicilion/fibjs).It does not support Node.js.
