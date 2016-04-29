var Path = require('path');
module.exports = {
    cache: true,
    debug: true,
    devtool: 'eval',
    entry: './js/init.js',
    output: {
        path: Path.join(__dirname, "build"),
        filename: '/js/build.min.js'
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        root: [Path.join(__dirname, "node_modules")],
        modulesDirectories: ['node_modules']
    }
};