'use strict'

export const permissions = {
  defaultRole: 'public', //Role name to use for anonymous users
  userRoleFieldName: 'roles', // Name of the association field for Role under User model
  modelsAsResources: true,
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
