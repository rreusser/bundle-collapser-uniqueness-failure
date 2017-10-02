var browserify = require('browserify');
var collapse = require('bundle-collapser');
var fs = require('fs');
var toString = require('stream-to-string');

toString(browserify('index.js').bundle(), function (err, str) {
  collapse(str).pipe(fs.createWriteStream('bundle.api.js'));
});

