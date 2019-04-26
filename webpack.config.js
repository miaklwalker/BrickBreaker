const path = require('path');

module.exports = {
  entry: './dist/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'publish')
  }
};