var browserify = require('browserify');
var collapse = require('bundle-collapser');
var fs = require('fs');

toString(browserify('index.js').bundle(), function (err, msg) {
  fs.writeFileSync('bundle.script.js', collapse(msg))
})
