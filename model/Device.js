let moment = require('moment');

module.exports = class Device {
  constructor({ip, mac}) {
    this.lastSeen = moment();
    this.ip = ip;
    this.mac = mac;
  }

  iHaveSeenYou() {
    this.lastSeen = moment();
  }
};
