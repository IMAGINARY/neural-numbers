const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const touch = require('gulp-touch-fd');
const pugData = require('./pug/data.js');

const OUTPUT_DIR = '..';

const paths = {
  html: {
    src: ['./pug/**/*.pug', '!./pug/include/**/*.pug', '!./pug/tpl/**/*.pug', '!./pug/sections/**/*.pug'],
    dest: `${OUTPUT_DIR}`,
    watchSrc: ['./pug/**/*.pug'],
  },
  styles: {
    src: './sass/**/*.scss',
    dest: `${OUTPUT_DIR}/assets/css`,
  },
  scripts: {
    src: './js/main-babel.js',
    filename: 'bundle',
    dest: `${OUTPUT_DIR}/assets/js`,
    watchSrc: ['./js/**/*.js', '!./js/main-lib.js', '!./js/dependencies.js'],
  },
  scriptsLib: {
    src: './js/main-lib.js',
    filename: 'neural-numbers',
    dest: `${OUTPUT_DIR}/assets/js`,
    watchSrc: ['./js/**/*.js', '!./js/main.js', '!./js/dependencies.js'],
  },
  scriptsDependencies: {
    src: './js/dependencies.js',
    filename: 'dependencies',
    dest: `${OUTPUT_DIR}/assets/js`,
    watchSrc: ['./js/dependencies.js'],
  },
  fonts: {
    src: './node_modules/typeface-exo-2/**/*',
    dest: `${OUTPUT_DIR}/assets/fonts/typeface-exo-2/`,
  },
};

function html() {
  return gulp.src(paths.html.src)
    .pipe(pug({
      pretty: true,
      data: pugData,
    })).pipe(rename({
      extname: '.html',
    })).pipe(
      gulp.dest(paths.html.dest)
    )
    .pipe(touch());
}

function styles() {
  return gulp.src(paths.styles.src, {
    sourcemaps: true,
  })
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

function es(entrypoint, outputName) {
  return browserify({
    extensions: ['.js', '.jsx'],
    entries: entrypoint,
    debug: true,
  })
    .transform('babelify', { presets: ['@babel/env'], sourceMaps: true })
    .on('error', (msg) => {
      // eslint-disable-next-line no-console
      console.error(msg);
    })
    .bundle()
    .pipe(source(`${outputName}.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename(`${outputName}.min.js`))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function scripts() {
  return es(paths.scripts.src, paths.scripts.filename);
}

function scriptsLib() {
  return es(paths.scriptsLib.src, paths.scriptsLib.filename);
}

function scriptsDependencies() {
  return es(paths.scriptsDependencies.src, paths.scriptsDependencies.filename);
}

function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

function watch() {
  gulp.watch(paths.html.watchSrc || paths.html.src, html);
  gulp.watch(paths.styles.watchSrc || paths.styles.src, styles);
  gulp.watch(paths.scripts.watchSrc || paths.scripts.src, scripts);
  gulp.watch(paths.scriptsLib.watchSrc || paths.scriptsLib.src, scriptsLib);
  gulp.watch(paths.scriptsDependencies.watchSrc || paths.scriptsDependencies.src, scriptsDependencies);
}

const build = gulp.parallel(html, styles, scripts, scriptsLib, scriptsDependencies, fonts);

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.scriptsLib = scriptsLib;
exports.scriptsDependencies = scriptsDependencies;
exports.watch = watch;

exports.build = build;
exports.default = build;
