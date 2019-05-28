const gulp = require('gulp')
const terser = require('gulp-terser')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const prettyError = require('gulp-prettyerror')

function initBrowser() {
  console.log('Initializing browser sync')
  return browserSync.init({
    server: {
      baseDir: './dist',
    },
  })
}

function reloadBrowser(done) {
  console.log('Reloading browser windows')
  browserSync.reload()
  done()
}

function scripts() {
  console.log('Preparing scripts')
  return gulp
    .src('./src/js/*.js')
    .pipe(terser({toplevel: true}))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist/js'))
}

function public() {
  console.log('Copying `public` files to `dist`')
  return gulp.src('public/**').pipe(gulp.dest('dist'))
}

function scss() {
  console.log('Compiling SCSS')
  return gulp
    .src('src/scss/index.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    )
    .pipe(cssnano())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
}

function watchFiles() {
  console.log('Watching `src` and `public` for changes')
  return gulp.watch(
    ['src/**', 'public/**'],
    gulp.series(public, scripts, scss, reloadBrowser),
  )
}

gulp.task('build', gulp.series(public, scripts, scss))

gulp.task(
  'default',
  gulp.series(public, scripts, scss, gulp.parallel(initBrowser, watchFiles)),
)
