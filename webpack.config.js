const path = require("path");
const fs = require("fs");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (env) => {
  const isProd = env === "production";
  const outputFolder = resolveApp("dist");
  const appSrc = resolveApp("src");

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

  return {
    entry: "./src/index.js",
    mode: isProd ? "production" : "development",

    output: {
      path: outputFolder,
      filename: "assets/js/app.[contenthash].js",
      clean: true,
    },

    optimization: {
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
          },
          generator: [
            {
              preset: "webp",
              implementation: ImageMinimizerPlugin.sharpGenerate,
              options: {
                encodeOptions: {
                  webp: {
                    quality: 90,
                  },
                },
              },
            },
            {
              type: "asset",
              implementation: ImageMinimizerPlugin.sharpGenerate,
              options: {
                encodeOptions: {
                  webp: {
                    quality: 90,
                  },
                },
              },
            },
          ],
        }),
      ],
      minimize: true,
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        inject: true,
        template: resolveApp("src/index.html"),
        minify: minifyOpts,
      }),
      new HtmlWebpackPlugin({
        filename: "uses.html",
        inject: true,
        template: resolveApp("src/uses.html"),
        minify: minifyOpts,
      }),
      new MiniCssExtractPlugin({
        filename: "assets/css/styles.[contenthash].css",
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${appSrc}/**/*`, { nodir: true }),
      }),
      new CopyPlugin({
        patterns: [{ from: "src/assets/images", to: "assets/images" }],
      }),
    ],

    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.svg$/,
              type: "asset/inline",
            },
            {
              test: /\.(png|jpg|jpeg|gif)$/i,
              type: "asset/resource",
              generator: {
                filename: "assets/images/[contenthash][ext][query]",
              },
            },
          ],
        },
        {
          test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[contenthash][ext][query]",
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
  };
};
