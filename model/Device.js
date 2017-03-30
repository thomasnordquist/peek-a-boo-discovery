const moment = require('moment');
const dns = require('dns');

module.exports = class Device {
  constructor({ ip, mac, vendor }) {
    this.lastSeen = moment();
    this.ip = ip;
    this.mac = mac;
    this.vendor = vendor;
    this.hostnames = [];
  }

  iHaveSeenYou() {
    this.lastSeen = moment();
  }

  get() {
    return new Promise((resolve, reject) => {
      dns.reverse(this.ip, (err, name) => {
        if (err) {
          return reject(err);
        }

        return resolve(name);
      });
    })
    .then(names => names)
    .catch(err => err);
  }

  async fetchHostName() {
    const b = await this.get();
    return b;
  }
};
