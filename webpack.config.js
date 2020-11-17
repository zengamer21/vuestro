const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    publicPath: '/',
  },
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    historyApiFallback: true,
    publicPath: '/',
    before: function(app, server, compiler) {
      app.use(require('body-parser').json());
      app.post('/vuestro-dev-console/:level', function(req, res) {
        if (req.body[0] === null | req.body[0] === undefined) {
          console[req.params.level](`[${req.ip}] [${req.params.level}]`, 'null or undefined');
        } else {
          console[req.params.level](`[${req.ip}] [${req.params.level}]`, ...req.body);
        }
        res.json({});
      });
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(JSON.parse(fs.readFileSync('package.json')).version),
    }),
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
      Vuex: ['vuex/dist/vuex.esm.js', 'default'],
      _: 'lodash',
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
      }),
    ],
    // split vendor js files into separate chunks
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        leafletVendor: {
          test: /[\\/]node_modules[\\/](leaflet.*)[\\/]/,
          name: "leaflet",
        },
        utilsVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|vuedraggable)[\\/]/,
          name: "utils",
        },
        iconVendor: {
          test: /[\\/]node_modules[\\/](vue\-awesome)[\\/]/,
          name: "icons",
        },
        aceVendor: {
          test: /[\\/]node_modules[\\/](brace)[\\/]/,
          name: "ace",
        },
        d3Vendor: {
          test: /[\\/]node_modules[\\/](d3.*)[\\/]/,
          name: "d3",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
};