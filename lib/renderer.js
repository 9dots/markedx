var marked = require('marked')
var createLexer = require('./lexer').createLexer

var renderer = new marked.Renderer()
renderer.listitem = function (text) {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text
      .replace(/^\s*\[ \]\s*/, '<div><input type="checkbox" class="task-list-item-checkbox"></div><div>')
      .replace(/^\s*\[x\]\s*/, '<div><input type="checkbox" class="task-list-item-checkbox" checked></div><div>')
    return '<li style="list-style: none; display: flex;">' + text + '</div></li>'
  } else {
    return '<li>' + text + '</li>'
  }
}

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})
marked.lexer = createLexer()

module.exports = marked
