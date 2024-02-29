// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mime = require('mime');
var comments = [];
// Create server
http.createServer(function(req, res) {
  // Get path
  var pathname = url.parse(req.url).pathname;
  // Get real path
  var realPath = 'assets' + pathname;
  // Get file path
  fs.exists(realPath, function(exists) {
    // If file exists
    if (exists) {
      // Read file
      fs.readFile(realPath, function(err, data) {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          res.end(err);
        } else {
          var contentType = mime.lookup(realPath);
          res.writeHead(200, {
            'Content-Type': contentType
          });
          res.write(data);
          res.end();
        }
      });
    } else {
      // If file does not exist
      if (pathname === '/getComments') {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write(JSON.stringify(comments));
        res.end();
      } else if (pathname === '/addComment') {
        var comment = url.parse(req.url, true).query;
        comments.push(comment);
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end();
      } else {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('This request URL ' + pathname + ' was not found on this server.');
        res.end();
      }
    }
  });
}).listen(3000);

