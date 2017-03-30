const moment = require('moment')
const dns = require('dns')

module.exports = class Device {
  constructor({ ip, mac, vendor, hostnames }) {
    this.firstSeen = moment()
    this.lastSeen = this.firstSeen
    this.ip = ip
    this.mac = mac
    this.vendor = vendor
    this.hostnames = hostnames
  }

  setVendor(vendor) {
    this.vendor = vendor
  }

  iHaveSeenYou() {
    this.lastSeen = moment()
  }

  static fetchHostName(ip) {
    return new Promise((resolve) => {
      dns.reverse(ip, (err, name) => {
        if (!err) {
          return resolve(name)
        }
        return resolve(null)
      })
    })
    .catch(() => {
      // Discard error
    })
  }
}
