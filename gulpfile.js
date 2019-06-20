const gulp = require("gulp"),
  browserify = require("browserify"),
  babelify = require("babelify"),
  sourceStream = require("vinyl-source-stream"),
  streamify = require("gulp-streamify"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  prettyError = require("gulp-prettyerror"),
  browserSync = require("browser-sync").create();

function initBrowser() {
  console.log("Initializing browser sync");
  return browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

function reloadBrowser(done) {
  console.log("Reloading browser windows");
  browserSync.reload();
  done();
}

function scripts() {
  console.log("Preparing scripts");
  return browserify({
    entries: "./src/js/index.js",
    debug: true
  })
    .transform(
      babelify.configure({
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-syntax-dynamic-import"]
      })
    )
    .bundle()
    .pipe(sourceStream("index.js"))
    .pipe(streamify(uglify()))
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./dist/js"));
}

function public() {
  console.log("Copying `public` files to `dist`");
  return gulp.src("public/**").pipe(gulp.dest("dist"));
}

function scss() {
  console.log("Compiling SCSS");
  return gulp
    .src("src/scss/index.scss")
    .pipe(prettyError())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(cssnano())
    .pipe(rename("index.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"));
}

function watchFiles() {
  console.log("Watching `src` and `public` for changes");
  return gulp.watch(
    ["src/**", "public/**"],
    gulp.series(public, scripts, scss, reloadBrowser)
  );
}

gulp.task("build", gulp.series(public, scripts, scss));

gulp.task(
  "default",
  gulp.series(public, scripts, scss, gulp.parallel(initBrowser, watchFiles))
);
