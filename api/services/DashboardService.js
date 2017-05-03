'use strict'

const Service = require('trails/service')

/**
 * @module DashboardService
 * @description Service to manage dashboard
 */
module.exports = class DashboardService extends Service {
  _prepareDashboard(dashboard, devices) {
    const data = dashboard.toJSON()
    const widgets = []
    dashboard.widgets.forEach(value => {
      const device = devices.find(device => device.id == value)
      if (device) {
        widgets.push(devices.find(device => device.id == value))
      }
    })
    devices.forEach(device => {
      const isAbsent = widgets.indexOf(device) == -1
      if (isAbsent) {
        widgets.push(device)
      }
    })

    data.widgets = widgets
    return data
  }

  getOrderedDeviceForRoom(roomId, userId) {
    const promises = [
      this.app.orm.Dashboard.find({
        where: {
          roomId: roomId,
          userId: userId
        }
      })
    ]

    if (roomId) {
      promises.push(this.app.orm.Device.findAll({
        where: {
          roomId: roomId
        }
      }))
    }
    else {
      promises.push(this.app.orm.User.findById(userId).then(user => user.getFavorites()))
    }

    return Promise.all(promises).then(results => {
      const dashboard = results[0]
      let devices = results[1]

      devices = devices.concat(this.getAdditionalGroupDevice(roomId, devices));

      if (dashboard) {
        return Promise.resolve(this._prepareDashboard(dashboard, devices))
      }
      else {
        return this.app.orm.Dashboard.create({
          roomId: roomId,
          userId: userId,
          widgets: devices.map(device => device.id)
        }).then(dashboard => {
          return Promise.resolve(this._prepareDashboard(dashboard, devices))
        })
      }
    })
  }

  getAdditionalGroupDevice(roomId, devices, wantedType) {
    const groupDevices = []
    if (!wantedType || wantedType == this.app.lisa.DEVICE_TYPE.LIGHT) {
      const lights = devices.filter(devices => devices.type == this.app.lisa.DEVICE_TYPE.LIGHT)
      if (roomId && lights.length > 1) {
        const lightsDevice = {
          id: 'group_light_' + roomId,
          name: 'Lights',
          type: 'group_light',
          roomId: roomId,
          data: {
            onoff: 'off',
            images: {'off': '/images/widgets/light_off.png', 'on': '/images/widgets/light_on.png'}
          },
          favorite: false,
          template: undefined
        }

        let hasDim = false
        let hasHue = false
        lights.forEach(light => {
          if (light.data.onoff == 'on') {
            lightsDevice.data.onoff = 'on'
          }
          if (light.data.dim) {
            hasDim = true
            lightsDevice.data.dim = light.data.dim
          }
          if (light.data.hue) {
            hasHue = true
            lightsDevice.data.hue = light.data.hue
          }
        })
        if (hasHue) {
          lightsDevice.template = require('../../widgets/hue_color.json')
        }
        else if (hasDim) {
          lightsDevice.template = require('../../widgets/hue_white.json')
        }
        else {
          lightsDevice.template = require('../../widgets/light.json')
        }
        groupDevices.push(lightsDevice)
      }
    }
    return groupDevices
  }

  saveDevicesOrderForRoom(roomId, userId, widgetsOrder) {
    return this.app.orm.Dashboard.find({
      where: {
        roomId: roomId,
        userId: userId
      }
    }).then(dashboard => {
      if (dashboard) {
        return this.app.orm.Dashboard.update({
          roomId: roomId,
          userId: userId,
          widgets: widgetsOrder
        }, {
          where: {
            roomId: roomId,
            userId: userId
          }
        }).then(_ => {
          return Promise.resolve(dashboard)
        })
      }
      else {
        return this.app.orm.Dashboard.create({
          roomId: roomId,
          userId: userId,
          widgets: widgetsOrder
        }).then(dashboard => {
          return Promise.resolve(dashboard)
        })
      }
    })
  }
}

