const go = require('../');
const test = require('test');
const hash = require('hash');

test.setup();

describe('go', () => {
  function cal(arrs) {
    return arrs.map(d => ++d);
  }

  it('shoud arrow function ok', () => {
    let res = go([1, 2], arrs => arrs.map(d => ++d));
    assert.deepEqual(res, [2, 3]);
  });

  it('shoud named function ok', () => {
    let res = go([1, 2], function cal(arrs) {
      return arrs.map(d => ++d);
    });
    assert.deepEqual(res, [2, 3]);
  });

  it('shoud named function ok', () => {
    let res = go([1, 2], cal);
    assert.deepEqual(res, [2, 3]);
  });

  it('shoud cache rpc obect ok', () => {
    let key = '_' + hash.md5(cal.toString()).digest().hex();
    assert.ok(go.cache.has(key))
  });
});

test.run(console.DEBUG);
