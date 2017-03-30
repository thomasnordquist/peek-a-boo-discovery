var arpscanner = require('arpscan');
var mac = require('mac-lookup');
var Device = require('./model/Device');
var DeviceList = require('./model/DeviceList');

var deviceList = new DeviceList();

async function lookupMac(addr) {
  return new Promise((resolve, reject) => {
    let addrShort = addr.slice(0, 8);
    mac.lookup(addrShort, (err, vendor) => {
      if (err) reject(err);
      resolve(vendor);
    });
  });
}

arpscanner((err, result) => {
  let data = result.map(async r => {
    var vendor = await lookupMac(r.mac);
    r.vendor = vendor || r.vendor;
    return r;
  });

  Promise.all(data).then(a => {
    let devices = a.map(d => new Device(d));
    deviceList.detectedDevices(devices);
  });
}, {
  command: 'arp-scan',
  args:['-l'],
  interface: 'en0',
  sudo: false
});
