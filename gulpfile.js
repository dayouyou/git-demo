'use strict';
/**
 * 1.less编译 压缩 合并 但是合并没必要 ，一般预处理css都可以导包
 * 2.js合并 压缩 混淆
 * 3.img复制
 * 4.html压缩*/

//在gulpfile中先载入gulp包，因为这个包提供一些api
    var gulp = require('gulp');
    var less = require('gulp-less');
    var cssnano = require('gulp-cssnano');
//1.less编译 压缩 合并
    gulp.task('style',function(){
        gulp.src(['src/styles/*.less','!src/styles/_*.less'])
            .pipe(less())
            .pipe(cssnano())
            .pipe(gulp.dest('dist/styles'))
            .pipe(browserSync.reload({
                stream:true
            }));
    });
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
//2.js合并 压缩 混淆
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))  //合并
        .pipe(uglify()) //压缩 混淆
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
//3.img复制
    gulp.task('image',function(){
        gulp.src('src/images/*.*')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({
                stream:true
            }));
    });
//4.html压缩
    var htmlmin = require('gulp-htmlmin');
    gulp.task('html',function(){
        gulp.src('src/*.html')
            .pipe(htmlmin({
                collapseWhitespace:true,       //合并 去除空格
                removeComments:true,         //合并 去除注释
                removeAttributeQuotes:false  //合并 去除属性引号
            }))
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.reload({
                stream:true
            }));
    });
//启动一个web服务器
    var browserSync = require('browser-sync');
    gulp.task('serve',function(){
        browserSync({
            server:{
                baseDir:['dist']
            }
        },function(err,bs){
            console.log(bs.options.getIn(["urls","local"]))
        });
        //server启动过后，我们就去watch一些文件
        gulp.watch('src/styles/*.less',['style']);
        gulp.watch('src/scripts/*.js',['script']);
        gulp.watch('src/images/*.*',['image']);
        gulp.watch('src/*.html',['html']);
    });