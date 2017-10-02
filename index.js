var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')
var A = require('./a')
var B = require('./b')

var root = document.createElement('div')
document.body.appendChild(root)

var App = createReactClass({
  render: function () {
    return React.createElement('div', null,
      React.createElement(A, {label: 'A: '}),
      React.createElement(B, {label: 'B: '})
    );
  }
})

ReactDOM.render(React.createElement(App), root)
