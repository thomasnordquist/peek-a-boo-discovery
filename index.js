const DeviceList = require('./model/DeviceList');
const NetworkDiscovery = require('./NetworkDiscovery');

const deviceList = new DeviceList();

const networkDiscovery = new NetworkDiscovery();
async function discover() {
  const deviceArray = await networkDiscovery.discover();
  deviceList.detectDevice(deviceArray);
  console.log(JSON.stringify(deviceArray));
}

discover();
