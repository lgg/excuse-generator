/* Vars */
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    jsmin = require('gulp-jsmin'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),

//optional
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    stylus = require('gulp-stylus'),
    //preprocess = require('gulp-preprocess'),
    jade = require('gulp-jade');


/* Sources */
var src_js = 'sources/js/**/*.js',
    src_css = 'sources/css/**/*.css',
    src_stylus = 'sources/css/**/*.styl',
    src_html = 'sources/html/**/*.html',
    src_img = 'sources/img/**/*',
    src_ico = 'sources/img/favicon/*.ico',
    src_jade = 'sources/html/**/*.jade',
    src_fonts = 'sources/fonts/**/*',
    src_material = 'node_modules/material-design-lite/material.min.*';


/* Destination folder */
var DEST = 'build/';
var dest_html = ""; // DEST + '';


/* Other */
var YOUR_LOCALS = {}; //for jade

var browsers_ver = ['not ie <= 9', 'iOS > 7'];


/* Tasks */
gulp.task('default', ['build', 'watch']);

gulp.task('build', ['buildJs',
    'buildCss',
    'buildStylus',
    'buildHtml',
    'buildJade',
    //'buildFonts',
    'buildImg',
    'buildFavicon',
    'buildMaterial'
]);


// Watch Files For Changes
gulp.task('watch', function () {
    livereload.listen(); //default web-server

    gulp.watch(src_js, ['reloadJs']);
    gulp.watch(src_css, ['reloadCss']);
    gulp.watch(src_stylus, ['reloadStylus']);
    gulp.watch(src_html, ['reloadHtml']);
    gulp.watch(src_jade, ['reloadJade']);
    gulp.watch(src_img, ['reloadImg']);
    gulp.watch(src_fonts, ['reloadFonts']);
});

/* -------------------- Dependencies */
//Material
gulp.task('buildMaterial', function () {
    gulp.src(src_material)
        .pipe(gulp.dest(DEST + 'material'))
        .pipe(livereload());
});



/* -------------------- JS */
//Reload
gulp.task('reloadJs', function () {
    gulp.src(src_js)
        .pipe(concat("js.min.js"))
        .pipe(gulp.dest(DEST + 'js'))
        .pipe(livereload());
});

//Build
gulp.task('buildJs', function () {
    gulp.src(src_js)
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(concat("js.min.js"))
        .pipe(gulp.dest(DEST + 'js'))
        .pipe(livereload());
});


/* -------------------- CSS */
//Reload
gulp.task('reloadCss', function () {
    gulp.src(src_css)
        .pipe(concat("css.min.css"))
        .pipe(gulp.dest(DEST + 'css'))
        .pipe(livereload());
});

//Build
gulp.task('buildCss', function () {
    gulp.src(src_css)
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(concat("css.min.css"))
        .pipe(gulp.dest(DEST + 'css'))
        .pipe(livereload());
});


/* -------------------- Stylus */
//Reload
gulp.task('reloadStylus', ['buildStylus']);

//Build
gulp.task('buildStylus', function () {
    gulp.src(src_stylus)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest(DEST + 'css'))
        .pipe(livereload());
});


/* -------------------- Html */
//Reload
gulp.task('reloadHtml', function () {
    gulp.src(src_html)
        .pipe(gulp.dest(dest_html))
        .pipe(livereload());
});

//Build
gulp.task('buildHtml', ['reloadHtml']);
//see jade


/* -------------------- Jade */
//Reload
gulp.task('reloadJade', function () {
    gulp.src(src_jade)
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest(dest_html))
        .pipe(livereload());
});

//Build
gulp.task('buildJade', function () {
    gulp.src(src_jade)
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(dest_html))
        .pipe(livereload());
});


/* -------------------- Images */
//Reload
gulp.task('reloadImg', ['buildImg']);

//Build
gulp.task('buildImg', function () {
    gulp.src(src_img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(DEST + 'img'))
        .pipe(livereload());
});

//Build
gulp.task('buildFavicon', function () {
    gulp.src(src_ico)
        .pipe(gulp.dest(dest_html))
        .pipe(livereload());
});


/* -------------------- Fonts */
//Reload
gulp.task('reloadFonts', ['buildFonts']);

//Build
gulp.task('buildFonts', function () {
    gulp.src(src_fonts)
        .pipe(gulp.dest(DEST + 'fonts'))
        .pipe(livereload());
});


/* -------------------- Other */
//Gulp-preprocess example
/*
 gulp.task('test-preprocess', function () {
 gulp.src('test.css')
 .pipe(preprocess({context: {RELEASE_TAG: 'here goes our replace'}}))
 .pipe(rename({suffix: '.b'}))
 .pipe(gulp.dest(''));
 });*/
