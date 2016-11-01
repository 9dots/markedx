/**
 * Imports
 */

require('babel-register')

const test = require('tape')
const markedx = require('..')
const hyperx = require('hyperx')
var marked = require('marked')
var sample = require('./sample')
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

test('should work for multiline markdown', (t) => {
  t.equal(markedx(
    '```\nstuff\nmore stuff```'
  ), '<div><pre><code>stuff\nmore stuff\n</code></pre></div>')
  t.equal(markedx(
    '1. stuff\n2. more stuff'
  ), '<div><ol><li>stuff</li><li>more stuff</li></ol></div>')
  t.end()
})

test('should work for code boxes', (t) => {
  markedx.component('codebox', function ({props, children}) {
    return hx`<div innerHTML=${marked('```js\n' + children[0].props.nodeValue + '```')}></div>`
  })
  console.log(markedx('<codebox>{`function () {\n\tvar a = 5\n}`}</codebox>'))
  t.end()
})

// console.log(markedx('```\n stuff \n```'))

test.only('it should work for indented checkboxes', (t) => {
  console.log(markedx(`
###### teacher materials
- [ ] one aasdf asdfasdf asfd asdfasf asfdasfdsadfasdf asdfasfds adfasdf asfasfdas fasdfs fasdfsdf asdfsfd  sdfasdf asfd asfsa fasfd s
- [ ] two

###### separate materials
- [ ] one 
- [ ] two

###### normal list
- one
- two`))
  t.end()
})

test('should add props to marked', (t) => {
  console.log(markedx(`<Marked style={{flex: true}}>on</Marked>`))
  t.end()
})

test('should gather links', (t) => {
  console.log(markedx(sample))
  t.end()
})

function icon () {
  console.log('iconining')
}
