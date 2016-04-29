var Path = require('path');
var webpack = require('webpack');
module.exports = {
    cache: true,
    debug: true,
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
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]
};