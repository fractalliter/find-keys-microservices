const http = require('http');
const findKeys = require('./index');

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let dt = '';
    req.on('data', (data) => {
      dt += data;
    });
    req.on('end', () => {
      res.writeHead(200, { 'content-type': 'application/json' });
      findKeys(
        'http://streamprovider:3000',
        JSON.parse(dt).keys,
        (err, json) => {
          if (!err) res.end(JSON.stringify(json));
          else res.end(JSON.stringify({ error: 'An error happen!' }));
        },
      );
    });
  } else {
    res.writeHead(405, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'wrong method' }));
  }
})
  .listen(3001);

console.log('consumer is running at localhost:3001/');
