var element = require('vdux/element').default
var hyperx = require('hyperx')
var marked = require('./renderer')
var vdux = require('vdux/string').default
var reduce = require('@f/reduce')

var v = vdux()

var hx = hyperx(element)

module.exports = {
  render: render,
  getProps: getProps
}

function getProps (props, context) {
  return Object.assign(props, {theme: context.uiTheme})
}

function render ({props, children}) {
  var joinedText = children.reduce(joinTextElements, [])
  return hx`<div {${props}} innerHTML=${joinedText.map(getElement).join('')}></div>`

  function getElement (elem) {
    return elem.type === '#text'
      ? marked(elem.props.nodeValue).replace(/(>)(\n)/gmi, '>')
      : v.render(elem, {uiTheme: props.theme})
  }
}

function joinTextElements (arr, elem, i, orig) {
  var prevIdx = arr.length - 1
  if (i > 0 && elem.type === '#text' && arr[prevIdx].type === '#text') {
    arr[prevIdx].props.nodeValue += '\n' + elem.props.nodeValue
    return arr
  }
  arr.push(elem)
  return arr
}
