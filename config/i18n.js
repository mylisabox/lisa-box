/**
 * i18n Configuration
 * (app.config.i18n)
 *
 * Internationalization allows your application to adapt to users in different
 * locales (languages). We recommend that you define all user-facing messages
 * in a locale file, in config/locales.
 *
 * Trails.js uses the i18next module to facilitate i18n integration.
 * @see {@link http://i18next.com/docs/}
 * @see {@link http://i18next.com/docs/options/}
 */
module.exports = {
  lng: 'en',
  resources: {
    en: {
      translation: require('./locales/en')
    }
  }
}
