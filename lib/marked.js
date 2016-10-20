var element = require('vdux/element').default
var hyperx = require('hyperx')
var marked = require('marked')
var vdux = require('vdux/string').default

var v = vdux()

var hx = hyperx(element)

module.exports = {
  render: render
}

function getElement (elem) {
  return elem.type === '#text'
    ? marked(elem.props.nodeValue).replace(/[\n|\r]/gi, '')
    : v.render(elem)
}

function render ({children}) {
  return hx`<div innerHTML=${children.map(getElement).join('')}></div>`
}
