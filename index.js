const axios = require('axios')
const DeviceList = require('./model/DeviceList')
const NetworkDiscovery = require('./NetworkDiscovery')
const config = require('./config')

const deviceList = new DeviceList()

async function discover() {
  return new Promise(async () => {
    const deviceArray = await NetworkDiscovery.discover()
    deviceList.detectedDevices(deviceArray)
    deviceList.removeGoneDevices(config.deviceIsGoneAfterSeconds * 1000)

    console.log(`Devices: ${deviceList.length}`)
    setTimeout(discover, config.updateInterval * 1000)
  }).catch((err) => {
    throw err
  })
}

function push() {
  axios.post(config.reportUrl, deviceList.devices)
  setTimeout(push, config.pushInterval * 1000)
}

discover()
push()
