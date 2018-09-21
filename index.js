module.exports = class HtmlBladePlugin {
  constructor (options = {}) {
    const defaultOptions = {
      extends: 'html',
      scripts: 'scripts',
      content: 'content',
    }

    this.options = Object.assign(defaultOptions, options)

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

  isInProduction () {
    return process.env.NODE_ENV === 'production'
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
