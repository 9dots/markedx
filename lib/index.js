/**
 * Modules
 */

var element = require('vdux/element').default
var vdux = require('vdux/string').default
var Marked = require('./marked')
var babel = require('babel-core')

var v = vdux()

/**
 * Expose
 */

module.exports = markedx
markedx.component = component


/**
 * markedx
 */

function markedx (code) {
  code = babel.transform(`<Marked>${code}</Marked>`, {plugins: [['transform-mdx', {pragma: 'elem'}]]}).code
  return v.render(eval(code))
}

function elem (tag, props, ...children) {
  if (tag in components) {
    tag = components[tag]
  }
  return element(tag, props, ...children)
}

var components = {}
function component (name, fn) {
  if (fn) {
    components[name] = fn
  } else {
    return components[name]
  }
}