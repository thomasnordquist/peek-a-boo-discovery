module.exports = class DeviceList {
  constructor() {
    this.devices = {};
  }

  addDevice(device) {
    this.devices[device.mac] = device;
  }

  detectDevice(discoveredDevice) {
    const mac = discoveredDevice.mac;
    if (!this.devices[mac]) {
      this.addDevice(discoveredDevice);
    } else {
      this.devices[mac].iHaveSeenYou();
    }
  }

  detectedDevices(devices) {
    devices.forEach(d => this.detectDevice(d));
  }
};
