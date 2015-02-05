var gulp = require('gulp');
var pkg = require('./package.json');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var deploy = require('gulp-gh-pages');

var banner = [
    '/**',
    ' * @name <%= pkg.name %>: <%= pkg.description %>',
    ' * @version <%= pkg.version %> <%= new Date().toUTCString() %>',
    ' * @author <%= pkg.author %>',
    ' * @license <%= pkg.license %>',
    ' * @url <%= pkg.repository.url %>',
    ' */'
].join('\n');

var dest = 'dist/';
var demo = 'demo/';

gulp.task('compile', function() {
    return gulp.src('responsiveLoader.js', {cwd: 'src'})
        .pipe(header(banner + '\n', { pkg: pkg }))
        .pipe(gulp.dest(dest));
});

gulp.task('compress', function() {
    return gulp.src(dest + '<%= pkg.name %>.js')
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(rename('responsiveLoader.min.js'))
        .pipe(gulp.dest(dest));
});

gulp.task('copy', function(){
    return gulp.src(dest + 'responsiveLoader.js')
        .pipe(gulp.dest(demo));
});

gulp.task('deploy', function () {
    return gulp.src('./demo/**/*')
        .pipe(deploy());
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['compile']);
});