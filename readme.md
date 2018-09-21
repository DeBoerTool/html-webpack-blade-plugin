# Blade extension for HTML Webpack Plugin

This plugin mutates the HTML file after it's been generated. Useful in situations like using `vue-cli`.

## Installation

```
npm install --save-dev html-webpack-blade-plugin
```

## Usage

```
plugins: [
  new HtmlWebpackBladePlugin()
]
```

By default `<html>` will be replaced with `@extends('html')`, `<head>` with `@section('scripts')` and `<body>` with `@section('content'). These defaults can be overridden:

```
plugins: [
  new HtmlWebpackBladePlugin({
    extends: 'my.layout.template',
    scripts: 'myScriptYield',
    content: 'myContentYield',
  })
]
```

## Also

The mutation will only be performed in `production` environments. You can still serve an HTML file as you normally would in development.

This package is licensed under the MIT license. Do as you wish.
