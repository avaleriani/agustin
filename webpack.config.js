const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const safePostCssParser = require("postcss-safe-parser");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (env) => {
  const isProd = env === "production";
  const cssFilename = "static/css/[name].[contenthash:8].css";
  const appBuild = resolveApp("dist");
  const appSrc = resolveApp("src");
  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/;
  const sassRegex = /\.(scss|sass)$/;
  const sassModuleRegex = /\.module\.(scss|sass)$/;

  const minifyOpts = {
    removeComments: false,
    removeEmptyElements: false,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  };

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      !isProd && require.resolve("style-loader"),
      isProd && {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {},
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {},
      });
    }
    return loaders;
  };

  return {
    bail: isProd,
    mode: "production",
    performance: {
      hints: !isProd ? false : "warning",
    },
    devServer: !isProd
      ? {
          hot: true,
          https: false,
          host: process.env.HOST || "0.0.0.0",
          compress: true,
          port: 3000,
          historyApiFallback: true,
        }
      : {},
    entry: {
      app: "./src/index.js",
    },
    output: {
      path: isProd ? path.resolve(__dirname, appBuild) : undefined,
      filename: "static/js/[name].[fullhash:8].js",
      chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
      pathinfo: !isProd,
      clean: true,
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: isProd
              ? {
                  inline: false,
                  annotation: true,
                }
              : false,
          },
        }),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpeg$/, /\.jpg$/, /\.png$/],
              loader: "url-loader",
              options: {
                limit: 10000,
                name: "static/images/[name].[fullhash:8].[ext]",
              },
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: appSrc,
              loader: require.resolve("babel-loader"),
              options: {
                plugins: [
                  [
                    require.resolve("babel-plugin-named-asset-import"),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent: "@svgr/webpack?-svgo![path]",
                        },
                      },
                    },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: isProd,
                compact: isProd,
              },
            },
            {
              test: /\.(js)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve("babel-loader"),
              options: {
                babelrc: true,
                configFile: false,
                compact: false,
                cacheDirectory: true,
                cacheCompression: isProd,
                sourceMaps: isProd,
              },
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
              }),
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,

                modules: true,
              }),
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                },
                "sass-loader"
              ),
              sideEffects: true,
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,

                  modules: true,
                },
                "sass-loader"
              ),
            },
            {
              test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
              type: "asset/resource",
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(env),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            filename: "uses.html",
            inject: true,
            template: resolveApp("src/uses.html"),
          },
          isProd
            ? {
                minify: minifyOpts,
              }
            : undefined
        )
      ),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            filename: "index.html",
            inject: true,
            template: resolveApp("src/index.html"),
          },
          isProd
            ? {
                minify: minifyOpts,
              }
            : undefined
        )
      ),
      new CopyPlugin({
        patterns: [{ from: "src/assets", to: "assets" }],
      }),
      new MiniCssExtractPlugin({
        filename: cssFilename,
        chunkFilename: "static/css/[name].[fullhash:8].chunk.css",
      }),
    ],
  };
};
