var React = require('react')
var createReactClass = require('create-react-class')
var value = require('./value')

var ShowValue = createReactClass({
  render () {
    return React.createElement('div', null, this.props.label, value)
  }
})

module.exports = ShowValue
