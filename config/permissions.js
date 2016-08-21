'use strict'

module.exports = {
  defaultRole: 'public', //Role name to use for anonymous users
  userRoleFieldName: 'roles', // Name of the association field for Role under User model
  //Initial data added when DB is empty
  fixtures: {
    roles: [{
      name: 'admin',
      publicName: 'Admin'
    },{
      name: 'guess',
      publicName: 'Guess'
    },{
      name: 'public',
      publicName: 'Public'
    }],
    resources: [],
    permissions: []
  }
}
