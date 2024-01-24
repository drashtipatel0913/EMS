const { resolve } = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
   mode: 'development',
   entry: { app: './src/Index.jsx' },
   output: {
      filename: '[name].bundle.js/main.js',
      path: resolve(__dirname, 'public'),
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         },
      ],
   },
   optimization: {
      splitChunks: {
         name: 'vendor',
         chunks: 'all',
      },
   },
   resolve: {
      fallback: {
         "path": false,
         "fs": false,
         "os": false,
         "crypto": false,
      },
   },
   plugins: [
      new DotenvWebpackPlugin(),
   ],
};