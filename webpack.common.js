const path = require('path');

module.exports = {
  entry: {
    app: './src/point.js',
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
  output: {
    filename: 'danehansen-point.min.js',
    library: ['danehansen', 'point'],
    libraryTarget: 'umd',
    path: __dirname,
  },
  externals: [
    {
      '@danehansen/math': {
        amd: '@danehansen/math',
        commonjs: '@danehansen/math',
        commonjs2: '@danehansen/math',
        root: ['danehansen', 'math'],
      },
    },
  ],
}
