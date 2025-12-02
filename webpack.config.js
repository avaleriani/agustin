const path = require("path");
const fs = require("fs");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (env) => {
  const isProd = env === "production";
  const outputFolder = resolveApp("dist");
  const appSrc = resolveApp("src");
  const paths = ["/", "/uses/", "/privacy/", "/impressum/"];

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
    entry: "./src/index.ts",
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "inline-source-map",

    devServer: {
      compress: true,
      port: 8080,
      hot: true,
    },

    output: {
      path: outputFolder,
      filename: "assets/js/app.[contenthash].js",
      clean: true,
      sourceMapFilename: "assets/js/app.[contenthash].map",
    },

    optimization: {
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.svgoMinify,
            options: {
              encodeOptions: {
                multipass: true,
                plugins: ["preset-default"],
              },
            },
          },
        }),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
          },
          deleteOriginalAssets: false,
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
    },

    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                url: false,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          oneOf: [
            {
              test: /\.svg$/,
              type: "asset",
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
      ],
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
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
      new HtmlWebpackPlugin({
        filename: "impressum.html",
        inject: true,
        template: resolveApp("src/impressum.html"),
        minify: minifyOpts,
      }),
      new HtmlWebpackPlugin({
        filename: "privacy.html",
        inject: true,
        template: resolveApp("src/privacy.html"),
        minify: minifyOpts,
      }),
      new MiniCssExtractPlugin({
        filename: "assets/css/styles.[contenthash].css",
      }),
      new PurgeCSSPlugin({
        paths: glob.sync(`${appSrc}/**/*`, { nodir: true }),
      }),
      new CopyPlugin({
        patterns: [{ from: "src/assets/images", to: "assets/images" }],
      }),
      new SitemapPlugin({
        base: "https://agustinvaleriani.com",
        paths,
        options: {
          filename: "sitemap.xml",
          lastmod: true,
          changefreq: "monthly",
        },
      }),
    ],
  };
};
