'use strict'

const path = require('path')
const gulp = require('gulp')
const log = require('./config/log').logger.info
const outDir = 'dist'
const srcDir = 'app'

const $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'gulp.*',
    'rimraf',
    'typescript',
    'run-sequence',
    'conventional-changelog',
    'jasmine-*',
    'karma'
  ]
})

// Utility Functions

// convert path to absolute from root directory
function root(_path) {
  return path.join(__dirname, './' + _path)
}

// convert array paths to absolute from root directory
function rootDir(dir) {
  return dir.map(root)
}

// Configuration
const TS_PROJECT = $.typescript.createProject(root('tsconfig.json'))

const PATHS = {

  config: {
    protractor: root('protractor.conf.js')
  },

  cleanable: root(outDir + '/*'),

  files: {
    ts: rootDir([
      srcDir + '/**/*.ts'
    ])
  },

  changelog: {
    filename: 'CHANGELOG.md'
  },

  sass: rootDir([
    'node_modules/treefrog/scss',
    srcDir + '/style/scss/app'
  ]),

  serverIndex: root('index.js'),

  specs: rootDir([
    outDir + '/**/*_spec.js'
  ]),

  e2e: rootDir([
    'test/**/*.e2e.js'
  ])

}

gulp.task('protractor', () => {
  log('gulp: protractor')
  return gulp.src(PATHS.e2e)
    .pipe($.protractor.protractor({
      configFile: PATHS.config.protractor
    }))
})

// Clean the dist file
gulp.task('clean', () => {
  log('gulp: clean')
  return gulp.src(PATHS.cleanable, {read: false}) // much faster
    .pipe($.rimraf({force: true}))
})

// Compile Typescript
gulp.task('compile', () => {
  log('gulp: compile')
  return TS_PROJECT.src()
    .pipe($.typescript(TS_PROJECT))
    .pipe($.size())
    .pipe(gulp.dest(TS_PROJECT.config.compilerOptions.outDir))
})

// Copy Files
gulp.task('copy', () => {
  log('gulp: copy')
  return gulp.src([
    srcDir + '/**/*.{js,html,png,jpg,jpeg}'
  ])
    .pipe($.copy(outDir))
})

// Compile Sass
gulp.task('sass', () => {
  log('gulp: sass')
  return gulp.src([srcDir + '/style/scss/app.scss', srcDir + '/**/*.scss'], {base: '.'})
    .pipe($.sass({
      includePaths: PATHS.sass,
      outputStyle: 'nested',
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest(outDir))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.cleanCss())
    .pipe(gulp.dest(outDir))
  // .pipe($.notify({ message: 'sass task complete' }))

})

// Setup files to watch
gulp.task('watch', () => {

  log('gulp: watch')
  // Watch .scss files
  gulp.watch(srcDir + '/**/*.scss', ['sass'])

  // Watch .ts files
  gulp.watch(srcDir + '/**/*.ts', ['compile'])

  // Watch normal files
  gulp.watch(srcDir + '/**/*.{js,html,png,jpg,jpeg}', ['copy'])

  // Create LiveReload server
  $.livereload.listen(require(root('/config/livereload')))

  // Watch any files in dist/, reload on change
  gulp.watch([outDir + '/**']).on('change', $.livereload.changed)

  // Watch routes
  gulp.watch(['./config/routes.js'], ['compile'])

})

// Run Sequence
gulp.task('default', $.runSequence('clean', ['copy', 'compile', 'sass'], 'watch'))
gulp.task('testing', $.runSequence('clean', ['copy', 'compile', 'sass']))
gulp.task('production', $.runSequence('clean', ['copy', 'compile', 'sass']))
