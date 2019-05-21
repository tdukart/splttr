import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as webpack from 'webpack';

type Mode = 'production' | 'development';

const settings = (mode: Mode = 'production'): webpack.Configuration => ({
  mode,

  entry: './client/index.ts',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  devtool: 'inline-source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsConfigPathsPlugin(),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Splttr Development',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

});

export default settings;
