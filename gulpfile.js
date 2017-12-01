const fs = require('fs-extra');
const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

// 创近一个任务组
gulp.task('default', ['clearLib', 'compileJS', 'moveConfig']);

// 清空lib文件
gulp.task('clearLib', [], function() {
    return fs.removeSync('./lib/')
});

// 编译 src 目录下的文件 放到lib中
gulp.task('compileJS', [], function() {
	var babelProcess = babel({
        presets: ['es2015', 'es2017'],
        plugins: ['transform-runtime']
    })

    babelProcess.on('error', function(e) {
        console.log(e);
        process.exit(1);
    });

    return watch('src/**/*.js', {
        verbose: true,
        ignoreInitial: false
    }).pipe(babelProcess).pipe(gulp.dest('lib'));

})

gulp.task('moveConfig', [], function() {
    return watch(['src/config/**/*.*', 'src/config/**/.*'], {
        verbose: true,
        ignoreInitial: false
    }, () => {
        gulp.src(['src/config/**/*.*', 'src/config/**/.*'], {base: 'src/'}).pipe(gulp.dest('lib'));
    })
});