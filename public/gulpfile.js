// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

// Styles
gulp.task('styles', function () {
    return gulp.src('css/*/*.css')
        .pipe(sass({style: 'expanded',}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('css/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest('css/styles'))
        .pipe(notify({message: 'Styles task complete'}));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest('js/'))
        .pipe(notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(livereload(server))
        .pipe(gulp.dest('images/'))
        .pipe(notify({message: 'Images task complete'}));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['css/styles', 'dist/scripts', 'dist/images'], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.run('styles', 'scripts', 'images');
});
