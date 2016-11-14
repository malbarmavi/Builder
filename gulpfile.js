'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var clean = require('gulp-clean');


gulp.task('clean',function(){
    return gulp.src('*.css')
        .pipe(clean({force: true}))
});

gulp.task('compile',['clean'], function () {
    return gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('.'));
});

gulp.task('minify',function(){
    return gulp.src('*.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch('*.scss', ['compile']);
});

gulp.task("default",['compile']);

gulp.task('build',['compile'],function(){
    return gulp.start('minify');
});  
