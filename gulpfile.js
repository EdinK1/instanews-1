const gulp = require('gulp')
const terser = require('gulp-terser')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()

function initBrowser() {
  console.log('Initializing browser sync')
  return browserSync.init({
      server: {
        baseDir: './dist'
      }
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
    .pipe(terser({ toplevel: true }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/js'))
}

function public() {
  console.log('Copying `public` files to `dist`')
  return gulp
    .src('public/**')
    .pipe(gulp.dest('dist'))
}

function watchFiles() {
  console.log('Watching `src` and `public` for changes')
  return gulp.watch(
    ['src/**', 'public/**'],
    gulp.series(public, scripts, reloadBrowser)
  )
}

gulp.task('build', gulp.series(public, scripts))

gulp.task(
  'default',
  gulp.series(
    public,
    scripts,
    gulp.parallel(initBrowser, watchFiles)
  )
)
