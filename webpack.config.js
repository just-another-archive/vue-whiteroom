const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader")
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')

module.exports = {
  mode: 'development',

  resolveLoader: {
    modules: [ resolve(__dirname, './node_modules') ],
  },

  entry: {
    'whiteroom' : resolve(__dirname, './src/server/'),
    'microscope' : resolve(__dirname, './src/client/'),
    'experiments'   : resolve(process.env.PWD, './experiments'),
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: require.resolve('vue-loader')
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-env')
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('vue-style-loader'),
          require.resolve('css-loader'),
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          require.resolve('vue-style-loader'),
          require.resolve('css-loader'),
          require.resolve('stylus-loader'),
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),

    new HotModuleReplacementPlugin(),

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['whiteroom'],
      template: resolve(__dirname, './www/index.html'),
      inject: true,
    }),

    new HtmlWebpackPlugin({
      filename: 'microscope.html',
      chunks: ['microscope', 'experiments'],
      template: resolve(__dirname, './www/microscope.html'),
      inject: true,
    }),

    new CleanTerminalPlugin()
  ],

  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 9999,
    hot: true,
    watchOptions: {
      poll: true
    }
  },

  stats: { colors: true },

  watch: true,
}
