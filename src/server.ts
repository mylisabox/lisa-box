
/**
 * @module server
 *
 * Fabrix framework.
 */

// Fabrix App
import { FabrixApp } from '@fabrix/fabrix'
import * as App from '.'

const app = new FabrixApp(App)

app.start().catch(app.stop)

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err)
  console.log(err.stack)
})
