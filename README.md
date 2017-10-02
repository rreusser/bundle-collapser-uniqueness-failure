# bundle-collapser-test

Created to demonstrate [bundle-collapser#20](https://github.com/substack/bundle-collapser/issues/20), in which non-unique relative pathnames lead to non-unique bundle IDs, which leads to incorrect requires.

For a reproduction in react, see: [bundle-collapser-uniqueness-failure](https://github.com/rreusser/bundle-collapser-uniqueness-failure). See also: [facebook/react#11049](https://github.com/facebook/react/issues/11049).

## To reproduce

### Setup

Setup is two directories containing index files with similar `require('./value')` statements.

```
├─ index.js
├─ a
│  ├─ index.js
│  └─ value.js
└─ b
   ├─ index.js
   └─ value.js
```

The key is that **the contents of `a/index.js` and `b/index.js` are identical.**

### baseline

Correct behavior using browserify alone:

```bash
$ browserify index.js | indexhtmlify > index.html
$ open index.html
```

Renders:

```
A: a
B: b
```

### bundle-collapser

Using bundle-collapser results in relative path resolution collisions when file contents are identical.

```bash
$ browserify -p bundle-collapser/plugin index.js | indexhtmlify > index.collapsed.html
$ open index.collapsed.html
```

```
A: a
B: a
```
