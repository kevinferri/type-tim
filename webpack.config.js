//const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    filename: 'bundle.min.js',
    path: `${__dirname}/build`,
  },
  //plugins: [new MinifyPlugin()],
  devtool: 'source-map',
  devServer: {
    contentBase: `${__dirname}/build`,
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json',
      '.gif',
      '.png',
      '.jpg',
      '.jpeg',
      '.svg',
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
