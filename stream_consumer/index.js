// @ts-check
/**
 *
 * @param {string} url
 * @param {Array<string>} keys
 * @param {Function} callback
 */
function findKeys(url, keys, callback) {
  const jsonURL = new URL(url);
  const request = jsonURL.protocol === 'https:' ? require('https') : require('http');

  const matches = [];
  request.get(url, (readJson) => {
    readJson.on('data', (data) => {
      if (keys.length === matches.length) {
        readJson.destroy();
      }
      keys.forEach((i) => {
        const f = data.toString().match(new RegExp(`"${i}":[^,]+`));
        if (f) matches.push(f[0]);
      });
    });

    readJson.on('error', (err) => {
      callback(err);
    });
    readJson.on('end', () => {
      callback(null, JSON.parse(`{${matches.join(', ')}}`));
    });
  });
}

module.exports = findKeys;
