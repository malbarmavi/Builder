'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var concat = require('gulp-concat'); 

gulp.task('clean',function(){
    return gulp.src('./build/*.css')
        .pipe(clean({force: true}))
});

gulp.task('compile',['clean'], function () {
    return gulp.src('src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('builder.css'))
        .pipe(gulp.dest('./build'));
});

gulp.task('minify',function(){
    return gulp.src('./build/builder.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('*.scss', ['compile']);
});

gulp.task("default",['compile']);

gulp.task('build',['compile'],function(){
    return gulp.start('minify');
});  
