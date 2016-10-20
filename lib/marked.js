var element = require('vdux/element').default
var hyperx = require('hyperx')
var marked = require('marked')

var hx = hyperx(element)

module.exports = {
  render: render
}

function render ({children}) {
  console.log('children', children)
  return hx`<div innerHTML=${marked(children[0].props.nodeValue)}></div>`
}
