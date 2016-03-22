var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var stream = require('webpack-stream');

var path = {
    HTML: '/index.html',
    ALL: ['js/*.js'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: '../',
    DEST_BUILD: '../',
    DEST: '../'
};
gulp.task('webpack', [], function() {
    return gulp.src(path.ALL) // gulp looks for all source files under specified path
        .pipe(sourcemaps.init()) // creates a source map which would be very helpful for debugging by maintaining the actual source code structure
        .pipe(stream(webpackConfig)) // blend in the webpack config into the source files
        .pipe(uglify())// minifies the code for better compression
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task('watch', function() {
    gulp.watch(path.ALL, ['webpack']);
});

gulp.task('default', ['webpack-dev-server', 'watch']);