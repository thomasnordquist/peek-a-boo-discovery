const config = require('./config')
const arpscanner = require('arpscan/promise')
const mac = require('mac-lookup')
const Device = require('./model/Device')

module.exports = class NetworkDiscovery {
  static async lookupMac(addr) {
    return new Promise((resolve, reject) => {
      const addrShort = addr.slice(0, 8)
      mac.lookup(addrShort, (err, vendor) => {
        if (err) reject(err)
        resolve(vendor)
      })
    })
  }

  static async discover() {
    return arpscanner({
      command: 'arp-scan',
      args: ['-l'],
      interface: config.interface,
      sudo: false,
    }).then(async (result) => {
      const data = await Promise.all(result.map(async (r) => {
        const vendor = await NetworkDiscovery.lookupMac(r.mac)
        r.vendor = vendor || r.vendor
        r.hostnames = await Device.fetchHostName(r.ip)
        return r
      }))

      const devices = data.map((d) => {
        const device = new Device(d)
        return device
      })
      return devices
    })
  }
}
