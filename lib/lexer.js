var marked = require('marked')

var links = {}

function gatherLinks (code) {
	var tokens = marked.lexer(code)
	links = tokens.links
}

function createLexer () {
	marked.Lexer.lex = function (src, options) {
		var lexer = new marked.Lexer(options)
	  lexer.tokens.links = links
	  return lexer.lex(src)
  }
  return marked.Lexer.lex
}

module.exports = {
	gather: gatherLinks,
	createLexer: createLexer
}