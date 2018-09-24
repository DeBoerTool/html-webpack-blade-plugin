module.exports = class HtmlBladePlugin {
  constructor (options = {}, isInProduction = false) {
    const defaultOptions = {
      extends: 'html',
      scripts: 'scripts',
      content: 'content',
    }

    this.options = Object.assign(defaultOptions, options)
    this.isInProduction = isInProduction

    this.replaces = [
      ['<!DOCTYPE html>', `@extends('${this.options.extends}')`],
      ['<html>', ''],
      ['</html>', ''],
      ['<head>', `@section('${this.options.scripts}')`],
      ['</head>', '\r@endsection'],
      ['<body>', `@section('${this.options.content}')`],
      ['</body>', '\r@endsection'],
    ]
  }

  mutate (data) {
    let replaced = data

    this.replaces.forEach((item) => {
      replaced = replaced.replace(item[0], item[1])
    })

    return replaced
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
