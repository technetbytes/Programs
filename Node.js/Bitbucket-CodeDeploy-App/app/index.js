const http = require('http');
const fs = require('fs');

const PORT = 8080;
const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`));

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`${config.message} ${config.name}`);
});

server.listen(PORT);
console.log(`Server listening on the ${PORT}`);

