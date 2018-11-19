const replaceTag = require('./src/replace-tag')

const defaultOptions = {
  extends: 'html',
  scripts: 'scripts',
  content: 'content',
}

module.exports = class HtmlBladePlugin {
  constructor (options = {}, isInProduction = true) {
    this.options = Object.assign(defaultOptions, options)
    this.isInProduction = isInProduction

    /*
     * Note the trailing spaces. They're there to hopefully not break
     * Blade when the input is needlessly minified.
     */ 
    this.replacements = [
      ['!DOCTYPE html', `@extends('${this.options.extends}') `],
      ['html', ''],
      ['/html', ''],
      ['head', `@section('${this.options.scripts}') `],
      ['/head', '@endsection '],
      ['body', `@section('${this.options.content}') `],
      ['/body', '@endsection '],
    ]
  }

  mutate (data) {
    return this.replacements.reduce(
      (data, replace) => replaceTag(replace[0], replace[1], data), 
      data
    )
  }

  apply (compiler) {
    this.isInProduction && compiler.hooks.compilation.tap(
      'HtmlBladePlugin',
      (compilation) => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
          'HtmlBladePlugin',
          (data, cb) => {
            data.html = this.mutate(data.html)

            cb(null, data)
          }
        )
      })
  }
}
