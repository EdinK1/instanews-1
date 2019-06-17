const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const sourceStream = require('vinyl-source-stream')
const streamify = require('gulp-streamify')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const prettyError = require('gulp-prettyerror')
const browserSync = require('browser-sync').create()

function initBrowser() {
  console.log('Initializing browser sync')
  return browserSync.init({
    server: {
      baseDir: './docs',
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
  return browserify({
    entries: './src/js/index.js',
    debug: true,
  })
    .transform(
      babelify.configure({
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-syntax-dynamic-import'],
      }),
    )
    .bundle()
    .pipe(sourceStream('index.js'))
    .pipe(streamify(uglify()))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./docs/js'))
}

function public() {
  console.log('Copying `public` files to `docs`')
  return gulp.src('public/**').pipe(gulp.dest('docs'))
}

function scss() {
  console.log('Compiling SCSS')
  return gulp
    .src('src/scss/index.scss')
    .pipe(prettyError())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    )
    .pipe(cssnano())
    .pipe(rename('index.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('docs/css'))
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
  gulp.series(
    public,
    scripts,
    scss,
    gulp.parallel(initBrowser, watchFiles),
  ),
)
