const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = env => {
  const isProd = env === "production";
  const cssFilename = 'static/css/[name].[contenthash:8].css';
  const folderName = 'build';
  const publicPath = 'public';
  return {
    bail: isProd,
    mode: env,
    performance: {
      hints: !isProd ? false : "warning"
    },
    devServer: !isProd ? {
      contentBase: path.join(__dirname, folderName),
      publicPath: publicPath,
      hot: true,
      quiet: true,
      watchOptions: {
        ignored: /node_modules/
      },
      https: true,
      overlay: false,
      clientLogLevel: 'none',
      host: process.env.HOST || '0.0.0.0',
      compress: true,
      port: 9000
    } : {},
    entry: {
      app: './src/index.js',
      devtool: isProd ? 'source-map' : 'eval-source-map'
    },
    output: {
      path: isProd ? path.resolve(__dirname, folderName) : undefined,
      filename: 'static/js/[name].[chunkhash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      pathinfo: !isProd
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: true,
          cache: true,
          sourceMap: isProd
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: isProd
              ? {
                inline: false,
                annotation: true
              }
              : false
          }
        })
      ]
    },
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.s[c|a]ss$/,
          use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/
          ],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            Object.assign(
              {
                fallback: require.resolve('style-loader'),
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: true
                    }
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                      plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009'
                        })
                      ]
                    }
                  }
                ]
              },
              extractTextPluginOptions
            )
          )
        }
      ]
    },
    plugins: [
      new InterpolateHtmlPlugin(env),
      new webpack.DefinePlugin(env),
      new CleanWebpackPlugin([folderName], {}),
      new HtmlWebpackPlugin({
        inject: !isProd,
        template: `${ publicPath }/index.html`,
        minify: isProd ? {

          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        } : {},
        hash: true,
        filename: 'index.html'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: isProd ? {
          warnings: false,
          comparisons: false
        } : {},
        output: isProd ? {
          comments: false
        } : {},
        sourceMap: isProd
      }),
      new ExtractTextPlugin({
        filename: cssFilename
      }),
      new CaseSensitivePathsPlugin()
    ]
  }
};