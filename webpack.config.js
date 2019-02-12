const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = env => {
  const isProd = env === "production";
  const cssFilename = 'static/css/[name].[contenthash:8].css';
  const appBuild = resolveApp('build');
  const appPublic = resolveApp('public');
  const appHtml = resolveApp('public/index.html');
  const appSrc = resolveApp('src');
  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/;
  const sassRegex = /\.(scss|sass)$/;
  const sassModuleRegex = /\.module\.(scss|sass)$/;

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      !isProd && require.resolve('style-loader'),
      isProd && {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            })
          ],
          sourceMap: isProd
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isProd
        }
      });
    }
    return loaders;
  };


  return {
    bail: isProd,
    mode: env,
    performance: {
      hints: !isProd ? false : "warning"
    },
    devServer: !isProd ? {
      contentBase: appPublic,
      watchContentBase: true,
      publicPath: '/',
      hot: true,
      inline: true,
      quiet: false,
      watchOptions: {
        ignored: /node_modules/
      },
      https: true,
      overlay: false,
      clientLogLevel: 'none',
      host: process.env.HOST || '0.0.0.0',
      compress: true,
      port: 3000,
      historyApiFallback: true
    } : {},
    entry: {
      app: './src/index.js'
    },
    output: {
      path: isProd ? path.resolve(__dirname, appBuild) : undefined,
      filename: 'static/js/[name].[hash:8].js',
      chunkFilename: 'static/js/[name].[hash:8].chunk.js',
      pathinfo: !isProd,
      publicPath: isProd ? 'agustin/' : '/'
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
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpeg$/, /\.jpg$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/images/[name].[hash:8].[ext]'
              }
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent: '@svgr/webpack?-svgo![path]'
                        }
                      }
                    }
                  ]
                ],
                cacheDirectory: true,
                cacheCompression: isProd,
                compact: isProd
              }
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: true,
                configFile: false,
                compact: false,
                cacheDirectory: true,
                cacheCompression: isProd,
                sourceMaps: isProd
              }
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isProd
              }),
              sideEffects: true
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isProd,
                modules: true
              })
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isProd
                },
                'sass-loader'
              ),
              sideEffects: true
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isProd,
                  modules: true
                },
                'sass-loader'
              )
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(env),
      new CleanWebpackPlugin([appBuild], {}),
      new CopyWebpackPlugin([
        { from: appPublic }
      ]),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: appHtml
          },
          isProd
            ? {
              minify: {
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
              }
            }
            : undefined
        )
      ),
      new MiniCssExtractPlugin({
        filename: cssFilename,
        chunkFilename: 'static/css/[name].[hash:8].chunk.css'
      })
    ]
  }
};