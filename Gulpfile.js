var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles:build', function(){
    gulp.src('assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css/'))
});

gulp.task('styles:watch', function(){
    gulp.watch('assets/sass/*.scss', ['styles:build']);
});