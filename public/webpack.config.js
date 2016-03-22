var path = require('path');
module.exports = {
    cache: true,
    debug: true,
    devtool: 'eval',
    entry: './js/init.js',
    output: {
        path: path.join(__dirname, "build"),
        filename: '/js/build.min.js'
    },
    resolve: {
        extensions: ['', '.js', '.json']
    }
};