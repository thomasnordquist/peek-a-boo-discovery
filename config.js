module.exports = {
  reportUrl: '' || process.env.REPORT_URL,
  updateInterval: 2, // Seconds
  deviceIsGoneAfterSeconds: 90, // Might be this time + updateInterval till a device is removed
  pushInterval: 15,
  interface: process.env.INTERFACE || 'eth0',
}
