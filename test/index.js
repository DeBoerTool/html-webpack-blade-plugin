const assert = require('assert')
const replace = require('../src/replace-tag')
const regex = require('../src/build-regex')
const HtmlBladePlugin = require('../index')
const templates = require('./templates')

describe('build-regex', () => {
  it('returns a new conditional regex', () => {
    assert.strictEqual('/<test.*>/', regex('test').toString())
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
})

describe('html-blade-plugin', () => {
  it('replaces tags', () => {
    const replaced = new HtmlBladePlugin().mutate(templates.html)

    assert.strictEqual(templates.blade, replaced)
  })
})