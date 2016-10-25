var marked = require('marked')

var renderer = new marked.Renderer()
renderer.listitem = function (text) {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text
      .replace(/^\s*\[ \]\s*/, '<input type="checkbox" class="task-list-item-checkbox"> ')
      .replace(/^\s*\[x\]\s*/, '<input type="checkbox" class="task-list-item-checkbox" checked> ')
    return '<li style="list-style: none">' + text + '</li>'
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

module.exports = marked
