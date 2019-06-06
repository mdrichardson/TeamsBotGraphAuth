var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');

var tsProject = ts.createProject("tsconfig.json");

gulp.task('clean', function() {
    return del([
        'dist/**/*'
    ])
});

gulp.task('build', function() {
    return gulp.src('src/**/*', {nodir:true})
        .pipe(tsProject())
        .pipe(gulp.dest("dist"));
});

gulp.task('default', gulp.series('clean', 'build'));

gulp.task('watch', function() {
    gulp.watch('src/**/*.ts').on('change', gulp.series('build'));
});