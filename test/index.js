const assert = require('assert')
const replace = require('../src/replace-tag')
const regex = require('../src/build-regex')
const HtmlBladePlugin = require('../index')
const templates = require('./templates')

describe('build-regex', () => {
  it('returns a new conditional regex', () => {
    assert.strictEqual('/<test\\b[^>]*>/', regex('test').toString())
  })
})


describe('replace-tags', function() {
  it('replaces tags with no properties', () => {
    const replaced = replace('html', '@directive', '<html>')

    assert.strictEqual('@directive', replaced)
  })
  
  it('replaces tags with properties', () => {
    const replaced = replace('html', '@directive', '<html prop="whatever">')

    assert.strictEqual('@directive', replaced)
  })

  /*
   * Although this plugin _can_ deal with minified code, this
   * will almost certainly break Blade. Don't do this.
   */
  it('replaces non-isolated tags', () => {
    const replaced = replace('html', '@directive', '<div><html prop="whatever"></div><p>')

    assert.strictEqual('<div>@directive</div><p>', replaced)
  })
})

describe('html-blade-plugin', () => {
  it('replaces tags', () => {
    const replaced = new HtmlBladePlugin().mutate(templates.html)

    assert.strictEqual(templates.blade, replaced)
  })
})