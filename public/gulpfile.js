var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default', function () {
    return gulp.src('js/init.js')
        .pipe(webpack())
        .pipe(gulp.dest('proccesed/new/'));
});