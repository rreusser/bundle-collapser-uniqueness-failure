var browserify = require('browserify');
var collapse = require('bundle-collapser/plugin');
var fs = require('fs');

browserify('index.js', {plugin: [collapse]}).bundle()
  .pipe(fs.createWriteStream('bundle.script.js'));
