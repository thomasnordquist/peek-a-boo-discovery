const moment = require('moment')

module.exports = class DeviceList {
  constructor() {
    this.devices = {}
    this.length = 0
  }

  updateListLength() {
    this.length = Object.keys(this.devices).length
  }

  addDevice(device) {
    this.devices[device.mac] = device
    this.updateListLength()
  }

  detectedDevice(discoveredDevice) {
    const mac = discoveredDevice.mac
    if (!this.devices[mac]) {
      this.addDevice(discoveredDevice)
    } else {
      this.devices[mac].iHaveSeenYou()
    }
  }

  removeGoneDevices(timeout) {
    const devices = Object.values(this.devices)
    devices
      .filter(device => (moment() - device.lastSeen) > timeout)
      .forEach((device) => {
        console.log('Removing', device)
        delete this.devices[device.mac]
      })

    this.updateListLength()
  }

  detectedDevices(devices) {
    devices.forEach(d => this.detectedDevice(d))
  }
}
