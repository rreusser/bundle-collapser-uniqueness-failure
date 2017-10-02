# bundle-collapser-uniqueness-failure

Created to demonstrate [bundle-collapser#20](https://github.com/substack/bundle-collapser/issues/20), in which non-unique relative pathnames lead to non-unique bundle IDs, which leads to incorrect requires.

## To reproduce

### Setup

Setup is two directories containing index files with similar `require('./component')` statements.

```
├─ index.js
├─ a
│  ├─ index.js
│  └─ component.js
└─ b
   ├─ index.js
   └─ component.js
```


### baseline

Correct behavior using browserify alone:

```bash
$ browserify index.js > bundle.js
$ node bundle.js 
aVal: a
bVal: b
```

### CLI

Using bundle-collapser as a command line plugin. Values are incorrect:

```bash
$ browserify -p bundle-collapser/plugin index.js > bundle.cli.js
$ node bundle.cli.js 
aVal: a
bVal: a
```

### API plugin usage

Using bundle-collapser as a script plugin is (obviously?) the same:

```javascript
// scripts/plugin.js

var browserify = require('browserify');
var collapse = require('bundle-collapser/plugin');
var fs = require('fs');

browserify('index.js', {plugin: [collapse]}).bundle()
  .pipe(fs.createWriteStream('bundle.plugin.js'));
```

```bash
$ node scripts/plugin.js
$ node bundle.plugin.js
aVal: a
bVal: a
```

### API function usage

Running it as a function directly leads to the same incorrect result:

```javascript
// scripts/api.js

var browserify = require('browserify');
var collapse = require('bundle-collapser');
var fs = require('fs');
var toString = require('stream-to-string');

toString(browserify('index.js').bundle(), function (err, str) {
  collapse(str).pipe(fs.createWriteStream('bundle.api.js'));
});
```

```bash
$ node scripts/api.js
$ node bundle.api.js
aVal: a
bVal: a
```
