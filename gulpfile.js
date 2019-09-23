const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];
  
  gulp.task('sass' , function() {
    return gulp.src('scss/**/*.scss')
      .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
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