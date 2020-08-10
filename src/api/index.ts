// Fabrix imports these as resource type namespaces,
// They do not have to be MVCP, they can be what ever.

import * as controllers from './controllers'
import * as models from './models'
import * as policies from './policies'
import * as services from './services'

// Utils is not a resource type, this can be moved somewhere else in the app
// import * as utils from './utils'

export {
  controllers,
  models,
  policies,
  services,
  // utils // Not needed here
}
