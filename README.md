# bundle-collapser-test

Created to demonstrate [bundle-collapser#20](https://github.com/substack/bundle-collapser/issues/20), in which non-unique relative pathnames lead to non-unique bundle IDs, which leads to incorrect requires.

## To reproduce

Correct behavior using browserify alone:

```bash
$ browserify index.js > bundle.js
$ node bundle.js 
aVal: a
bVal: b
```

Using bundle-collapser as a command line plugin. Values are incorrect:

```bash
$ browserify -p bundle-collapser/plugin index.js > bundle.cli.js
$ node bundle.cli.js 
aVal: a
bVal: a
```

Using bundle-collapser as a script plugin does not resolve the issue:

```javascript
# scripts/bundle.js:

var browserify = require('browserify');
var collapse = require('bundle-collapser/plugin');
var fs = require('fs');

browserify('index.js', {plugin: [collapse]}).bundle()
  .pipe(fs.createWriteStream('bundle.script.js'));
```

```bash
$ node scripts/bundle.js
$ node bundle.script.js
aVal: a
bVal: a
```
