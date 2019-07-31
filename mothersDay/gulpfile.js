var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('babel', function () {
  var timestamp = new Date().getTime()
  gulp.src("main.js")
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min.' + timestamp }))
    .pipe(gulp.dest("dist/"));
})

gulp.task('auto', function () {
  gulp.watch('./**.js', ['babel'])
})

gulp.task('default', ['auto', 'babel'])

