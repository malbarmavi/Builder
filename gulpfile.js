'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var concat = require('gulp-concat'); 

// tasks configration
var config = {
    compile :{
        src:'src/*.scss',
        dest:'./build'
    },
    concat: {
        fileName:'builder.css'
    },
    clean:{
        path :'./build/*.css'
    },
    minify:{
        src:'./build/builder.css',
        dest:'./build'
    },
    watch : {
        src:["src/*.scss","src/partials/*.scss"]
    }

}

gulp.task('clean',function(){
    return gulp.src(config.clean.path)
        .pipe(clean({force: true}))
});

gulp.task('compile',['clean'], function () {
    return gulp.src(config.compile.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat(config.concat.fileName))
        .pipe(gulp.dest(config.compile.dest));
});

gulp.task('minify',function(){
    return gulp.src(config.minify.src)
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.minify.dest));
});

gulp.task('watch', function () {
    gulp.watch(config.watch.src, ['compile']);
});

gulp.task("default",['compile']);

gulp.task('build',['compile'],function(){
    return gulp.start('minify');
});  
