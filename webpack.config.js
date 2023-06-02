const path = require('path')
module.exports = {
    mode: 'development',
    entry: path.join(__dirname,'src/js','index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build.js'
    },
  module: {}
}