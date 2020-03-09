const { createServer } = require('http');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const serve = (templatePath) => {
  const server = createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(readFileSync(resolve(templatePath)));
  })
  
  server.listen(8080);

  return server;
};

module.exports = serve;
