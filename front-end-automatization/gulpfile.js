const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const sassCompile = () => gulp
  .src('src/scss/*.scss')
  .pipe(sass({ outputStyle: "compressed" }))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.stream())

exports.sassCompile = sassCompile

exports.plugins = () => gulp
  .src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/moment/min/moment.min.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('build/js'))


const concatJs = () => gulp
  .src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({ presets: ['@babel/env'] }))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.stream())

exports.concatJs = concatJs

exports.browserSync = () => browserSync.init({
  port: 4040,
  server: {
    baseDir: './build',
  }
})

exports.watchFiles = () => {
  gulp.watch('src/scss/*.scss', sassCompile)
  gulp.watch('src/js/*.js', concatJs)

  gulp.watch(['build/*.html', 'build/js/*.js'])
    .on('change', browserSync.reload)
}

exports.default = gulp
  .parallel(
    this.watchFiles,
    this.plugins,
    this.concatJs,
    this.sassCompile,
    this.browserSync
  )

