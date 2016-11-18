/**
 * Cron Configuration
 * (app.config.cron)
 *
 * Configure cron tasks
 *
 * @see {@link https://github.com/jaumard/trailpack-cron}
 */
module.exports = {
  defaultTimeZone: 'Europe/Paris', // Default timezone use for tasks
  jobs: {
    myJob: {
      schedule: '*/50 * * * * *',
      onTick: app => {
        app.log.info('I am searching for new devices')
        app.services.PluginService.callOnPlugins('searchDevices')
      },
      onComplete: app => {
        app.log.info('I am done')
      },
      start: true, // Start task immediately
      timezone: 'Europe/Paris' // Custom timezone
    }
  }
}
