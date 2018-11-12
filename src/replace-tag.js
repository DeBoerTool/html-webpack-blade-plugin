const regex = require('./build-regex')

module.exports = (pattern, replacement, string) => string.replace(regex(pattern), replacement)