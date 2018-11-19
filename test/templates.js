const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Some Title</title>
  </head>

  <body>
    <p>Here is the body.</p>
  </body>
</html>
`

const blade = `
@extends('html') 

  @section('scripts') 
    <title>Some Title</title>
  @endsection 

  @section('content') 
    <p>Here is the body.</p>
  @endsection 

`

module.exports = { html, blade }