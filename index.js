const fs = require('fs');
const Calculate = require('parallel-calculate');
const process = require('process');
const path = require('path');
const hash = require('hash');
const util = require('util');
const os = require('os');

const temdir = process.env.TMPDIR ||
  process.env.TMP ||
  process.env.TEMP ||
  '/tmp';

const cache = new util.LruCache(50);

module.exports = (datas, fn) => {
  let fnStr = fn.toString();
  let hashKey = '_' + hash.md5(fnStr).digest().hex();

  if (cache.has(hashKey)) {
    return cache.get(hashKey).proxy(datas, hashKey);
  }

  const fnTemplate =`module.exports={${hashKey}:${fnStr}}`;

  let fnPath = path.join(temdir, `${hashKey}.js`);

  if (!fs.exists(fnPath)) {
    fs.writeFile(fnPath, fnTemplate);
  }

  let cal = new Calculate(fnPath, os.CPUs() * 2);
  cache.put(hashKey, cal);
  return cal.proxy(datas, hashKey);
};

module.exports.cache = cache;
