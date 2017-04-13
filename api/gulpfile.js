var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('js', function() {
    gulp.src('./js/index.js')
        .pipe($.uglify())
        .pipe($.rename('index.min.js'))
        .pipe(gulp.dest('./dist'))

});

gulp.task('css', function() {
    gulp.src('./css/style.css')
        .pipe($.cssmin())
        .pipe($.rename('index.min.css'))
        .pipe(gulp.dest('./dist'))

});

gulp.task('bulid', ['css', 'js']);

/*

gulp.task('clean', function() {
    gulp.src('/dist')
        .pipe($.clean());
});

gulp.task('default', ['bulid']);
*/
