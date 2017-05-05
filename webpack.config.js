module.exports = {
  entry: {
    app: './src/Point.js',
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
    filename: 'danehansen-Point.min.js',
    library: ['danehansen', 'Point'],
    libraryTarget: 'umd',
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
