const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
  
  gulp.task('sass' , function() {
    return gulp.src("./scss/**/*.scss")
      .pipe(sass({
        outputStyle: 'nested',
        style: 'expanded',
        "sourcemap=none": true,
        precision: 10,
        includePaths: ['.'],
        noCache: true,
        onError: console.error.bind(console, 'Sass error:')
      }))
      .pipe(autoprefixer())
      .pipe(cssnano())
      .pipe(rename({
        basename: "app",
        suffix: ".min",
        extname: ".css"
      }))
      .pipe(gulp.dest('public/css'))
  });
  
  gulp.task('scripts', function(){
    return gulp.src('js/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      basename: 'app',
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(gulp.dest('public/js'))
  });
  
  gulp.task('watch', function(){
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    gulp.watch('js/**/*.js', gulp.series('scripts'));
  });
  
  gulp.task('build', gulp.series('sass', 'scripts'));