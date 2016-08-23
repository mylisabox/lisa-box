/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  // map tells the System loader where to look for things
  const map = {
    'app': './', // 'dist',
    '@angular': 'node_modules/@angular',
    'primus': 'primus',
    'js-data': 'node_modules/js-data',
    'js-data-http': 'node_modules/js-data-http',
    //'angular2-universal/polyfills': 'node_modules/angular2-universal/polyfills',
    //'angular2-universal': 'node_modules/angular2-universal',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs': 'node_modules/rxjs'
  }
  // packages tells the System loader how to load when no filename and/or no extension
  const packages = {
    'app': {main: 'browser.js', defaultExtension: 'js'},
    'primus': {
      main: 'primus.js',
      defaultExtension: 'js'
    },
    'js-data': {main: 'dist/js-data.js', defaultExtension: 'js'},
    'js-data-http': {main: 'dist/js-data-http.js', defaultExtension: 'js'},
    'rxjs': {defaultExtension: 'js'},
    //'angular2-universal/polyfills': {format: 'cjs', main: 'dist/polyfills', defaultExtension: 'js'},
    //'angular2-universal': {format: 'cjs', main: 'dist/browser/index', defaultExtension: 'js'},
    'angular2-in-memory-web-api': {main: 'index.js', defaultExtension: 'js'},
  }
  const ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ]
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'}
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js'}
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  const setPackageConfig = System.packageWithIndex ? packIndex : packUmd
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig)
  const config = {
    baseURL: '/',
    map: map,
    packages: packages
  }
  System.config(config)
})(this)
