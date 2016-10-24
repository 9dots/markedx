var element = require('vdux/element').default
var hyperx = require('hyperx')
var marked = require('marked')
var vdux = require('vdux/string').default

var v = vdux()

var hx = hyperx(element)

module.exports = {
  render: render
}

function render ({props, children}) {
  var joinedText = children.reduce(joinTextElements, [])
  var style = props.style ? `style=${props.style}` : ''
  console.log(style)
  return hx`<div ${style} innerHTML=${joinedText.map(getElement).join('')}></div>`
}

function getElement (elem) {
  return elem.type === '#text'
    ? marked(elem.props.nodeValue).replace(/(>)(\n)/gmi, '>')
    : v.render(elem, {uiTheme: {}})
}

function joinTextElements (arr, elem, i, orig) {
  var prevIdx = arr.length - 1
  if (i > 0 && elem.type === '#text' && arr[prevIdx].type === '#text') {
    var prev = arr[prevIdx]
    arr[prevIdx].props.nodeValue += '\n' + elem.props.nodeValue
    return arr
  }
  arr.push(elem)
  return arr
}
