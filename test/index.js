/**
 * Imports
 */

require('babel-register')

const test = require('tape')
const markedx = require('..')
const hyperx = require('hyperx')
const hx = hyperx(markedx.h)



/**
 * Tests
 */

test('should convert plain markdown', (t) => {
  t.equal(markedx('## Hello World'), '<div><h2 id="hello-world">Hello World</h2>\n</div>')
  t.end()
})

test.only('shouldnt break markdown with standard html tags', (t) => {
  t.equal(markedx(
`## Hello World
I am the foo man.
<a href="foo"/>
<h2>Goodbye World</h2>`
  ), `<div><h2 id="hello-world">Hello World</h2>
<p>I am the foo man.\n<a href="foo"/></p>
<h2>Goodbye World</h2></div>`)
  t.end()
})

test('should work with inline component', (t) => {
  markedx.component('header', function ({props, children}) {
    return hx`<div>i</div>
    <h2>${children[0]}</h2>`
  })

  console.log('markedx', markedx(
    `<header>Hello</header>
  ### hello`
  ))
})

function icon () {
  console.log('iconining')
}
