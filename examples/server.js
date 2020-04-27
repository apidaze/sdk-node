const fs = require('fs');
const path = require('path');
const { createServer } = require('http');
const { URL } = require('url');

const serve = (routes) => {
  const server = createServer(function (req, res) {
    const { method } = req;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { pathname, searchParams } = url;

    console.log(`A ${method} request on ${pathname} with`, searchParams);

    const callback = routes[pathname];
    let responseBody;
    
    if (callback) {
      res.writeHead(200, {'Content-Type': 'text/xml'});
      const payload = Array.from(searchParams.entries())
        .reduce((pv, [key, value]) => ({
          ...pv,
          [key]: value
        }), {});

      responseBody = callback(payload);
      res.end(responseBody);
    } else {
      fs.readFile(path.resolve(`${__dirname}/assets/${req.url}`), (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end();
          return;
        }

        res.writeHead(200);
        res.end(data);
      });
    }
  });
  
  server.listen(8080);

  return server;
};

module.exports = serve;
