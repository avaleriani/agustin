var Path = require('path');
var webpack = require('webpack');
module.exports = {
    cache: true,
    debug: false,
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: false,
    //devtool: 'eval',
    devtool: 'source-map', //eval for dev
    entry: './js/init.js',
    output: {
        path: Path.join(__dirname, "build"),
        filename: '/js/build.min.js'
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        root: [Path.join(__dirname, "node_modules")],
        modulesDirectories: ['node_modules']
    },
    module:{
        loaders:[
            { test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000000' },
            { test: /\.scss$/,loader: "style!css?url=false!sass" }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true
        })
    ]
};