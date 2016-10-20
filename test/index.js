/**
 * Imports
 */

require('babel-register')

const test = require('tape')
const markedx = require('..')
const hyperx = require('hyperx')
var element = require('vdux/element').default
const hx = hyperx(element)



/**
 * Tests
 */

test('should convert plain markdown', (t) => {
  t.equal(markedx('## Hello World'), '<div><h2 id="hello-world">Hello World</h2></div>')
  t.end()
})

test('shouldnt break markdown with standard html tags', (t) => {
  t.equal(markedx(
`## Hello World
I am the foo man.
<a href="foo"/>
<h2>Goodbye World</h2>`
  ), `<div><h2 id="hello-world">Hello World</h2><p>I am the foo man.</p><a href="foo"></a><h2>Goodbye World</h2></div>`)
  t.end()
})

test('should work with inline component', (t) => {
  markedx.component('header', function ({props, children}) {
    return hx`<div>i</div>`
  })
  t.equal(
    markedx(
      `<header>Hello</header>
        ### hello`
    ), `<div><div>i</div><h3 id="hello">hello</h3></div>`)
  t.end()
})

function icon () {
  console.log('iconining')
}
