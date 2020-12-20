const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' });
  fs.createReadStream('example.json')
    .pipe(res);
})
  .listen(3000);

console.log('provider is running at localhost:3000/');
